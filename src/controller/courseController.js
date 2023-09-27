import db from "../config/db.js";

export const getCourseList = async (req, res) => {
  //로그인했는지 여부를 판단한다 그래서 유저 id를 가져온다 로그인 안했으면 null
  const userId = req.use ? req.user_id : null;

  //데이터 베이스에서 코스 정보ㄹ와 방문여부를 가져온다.
  const QUERY = `
  SELECT c.*, uc.users_course_id FROM course c
  LEFT JOIN users_course uc 
  ON c.course_id = uc.course_id AND uc.user_id  = ?`;

  const courseList = await db.execute(QUERY, [userId]).then((result) => result[0]);
  console.log(courseList);
  res.json(courseList);

  //데이터베이스 정보 가져오기
  // const QUERY = "SELECT * FROM course";
  // const a = await db.execute(QUERY).then((result) => result[0]);
  // console.log(a);
  // return res.send(a);
};

/**
 * controller -> service (중요한 처리들) -> repository
 */
