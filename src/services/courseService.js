import { Op } from "sequelize";
import { Kelas, KategoriKelas, Tutor } from "../models/index.js";

const CourseService = {
  getAllCourses: async (query) => {
    const {
      search,
      kategori_id,
      sort = "createdAt",
      order = "DESC",
      page = 1,
      limit = 10,
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const where = {};

    if (search) [
      where.title = {
        [Op.like]: `%${search}%`,
      },
      {
      "$kategori.name_kategori$": {
        [Op.like]: `%${search}%`,
      },
    },
  ]

    if (kategori_id) {
      where.kategori_id = kategori_id;
    }

    const allowedSort = [
      "title",
      "normal_price",
      "discount_price",
      "createdAt",
    ];

    const sortField = allowedSort.includes(sort)
      ? sort
      : "createdAt";

    const sortOrder =
      order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const result = await Kelas.findAndCountAll({
      where,
      include: [
        {
          model: KategoriKelas,
          as: "kategori",
          attributes: ["id", "name_kategori"],
        },
        {
          model: Tutor,
          as: "tutor",
          attributes: ["id", "user_id", "expertise"],
        },
      ],
      order: [[sortField, sortOrder]],
      limit: limitNumber,
      offset,
      distinct: true,
    });

    return {
      data: result.rows,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalData: result.count,
        totalPage: Math.ceil(
          result.count / limitNumber
        ),
      },
    };
  },

  getCourseById: async (id) => {
    const course = await Kelas.findByPk(id, {
      include: [
        {
          model: KategoriKelas,
          as: "kategori",
          attributes: ["id", "name_kategori"],
        },
        {
          model: Tutor,
          as: "tutor",
          attributes: ["id", "user_id", "expertise"],
        },
      ],
    });

    if (!course) {
      const error = new Error(
        "Course tidak ditemukan"
      );
      error.statusCode = 404;
      throw error;
    }
    return course;
  },

  createCourse: async (data) => {
    const {
      kategori_id,
      tutor_id,
      title,
      thumbnail,
      description,
      normal_price,
      discount_price,
    } = data;

    const kategori =
      await KategoriKelas.findByPk(kategori_id);

    if (!kategori) {
      const error = new Error(
        "Kategori tidak ditemukan"
      );
      error.statusCode = 404;
      throw error;
    }

    const tutor = await Tutor.findByPk(tutor_id);

    if (!tutor) {
      const error = new Error(
        "Tutor tidak ditemukan"
      );
      error.statusCode = 404;
      throw error;
    }

    return await Kelas.create({
      kategori_id,
      tutor_id,
      title,
      thumbnail,
      description,
      normal_price,
      discount_price,
    });
  },

  updateCourse: async (id, data) => {
    const course = await Kelas.findByPk(id);
    if (!course) {
      const error = new Error(
        "Course tidak ditemukan"
      );
      error.statusCode = 404;
      throw error;
    }
    await course.update(data);
    return course;
  },

  deleteCourse: async (id) => {
    const course = await Kelas.findByPk(id);
    if (!course) {
      const error = new Error(
        "Course tidak ditemukan"
      );
      error.statusCode = 404;
      throw error;
    }
    await course.destroy();
  },
};

export default CourseService;