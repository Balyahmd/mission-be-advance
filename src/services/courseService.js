import { Op } from "sequelize";
import { Kelas, KategoriKelas, Tutor } from "../models/index.js";

const CourseService = {
 getAllCourses: async (query = {}) => {
  const {
    search,
    sort = "createdAt",
    order = "DESC",
  } = query;

  const pageNumber = Math.max(parseInt(query.page, 10) || 1, 1);
  const limitNumber = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
  const offset = (pageNumber - 1) * limitNumber;

  const emptyResult = () => ({
    data: [],
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalData: 0,
      totalPage: 0,
    },
  });

  const where = {};

  if (search) {
    const keyword = String(search).trim();
    if (keyword) {
      where[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { "$kategori.name_kategori$": { [Op.like]: `%${keyword}%` } },
      ];
    }
  }

  // Sorting
  const allowedSort = ["title", "normal_price", "discount_price", "createdAt"];
  const sortField = allowedSort.includes(sort) ? sort : "createdAt";
  const sortOrder = String(order).toUpperCase() === "ASC" ? "ASC" : "DESC";

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
    subQuery: false,
  });

  return {
    data: result.rows,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalData: result.count,
      totalPage: Math.ceil(result.count / limitNumber),
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
      const error = new Error("Course tidak ditemukan");
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

    const kategori = await KategoriKelas.findByPk(kategori_id);

    if (!kategori) {
      const error = new Error("Kategori tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    const tutor = await Tutor.findByPk(tutor_id);

    if (!tutor) {
      const error = new Error("Tutor tidak ditemukan");
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
      const error = new Error("Course tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    await course.update(data);
    return course;
  },

  deleteCourse: async (id) => {
    const course = await Kelas.findByPk(id);
    if (!course) {
      const error = new Error("Course tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    await course.destroy();
  },
};

export default CourseService;
