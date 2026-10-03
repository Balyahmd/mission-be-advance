import CourseService from "../services/courseService.js";

export const getList = async (req, res, next) => {
  try {
    const result = await CourseService.getAllCourses(req.query);

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data course",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetail = async (req, res, next) => {
  try {
    const result = await CourseService.getCourseById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan detail course",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const result = await CourseService.createCourse(req.body);

    res.status(201).json({
      success: true,
      message: "Course berhasil dibuat",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await CourseService.updateCourse(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Course berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await CourseService.deleteCourse(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};