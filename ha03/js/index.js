
// Aufgabe 3.1.1
function notGoodGrades(grades) {
  return grades.filter( (cur) => parseFloat(cur.grade.replace(",", ".")) >= 3.0)
}

// Aufgabe 3.1.2
function gradeOverview(students, grades) {
  let new_array = students.map(cur_student => {
    cur_grades = grades.filter(grade => grade.matrikelnummer == cur_student.matrikelnummer);
    return {
      student: cur_student,
      grades: cur_grades
    }
  })
  return new_array;
}

// Aufgabe 3.1.3
function duplicateStudents(students) {
  let matrikelnummern = students.reduce((acc, cur_student) => {
    let cur_num = cur_student.matrikelnummer;
    if (!acc[cur_num]) {
      acc[cur_num] = [];
    }
    acc[cur_num].push(cur_student);
    return acc;
  }, {});

  let duplicates = Object.values(matrikelnummern).filter((cur) => cur.length > 1);
  let ret = duplicates.map((cur_num) => {
    return {
      matrikelnummer: cur_num[0].matrikelnummer,
      students: cur_num
    }
  });
  return ret;
}

// Aufgabe 3.1.4
function invalidGrades(grades) {
    let matrikelnummern = grades.reduce((acc, cur_grade) => {
        let cur_num = cur_grade.matrikelnummer;
        let cur_course = cur_grade.course;

        if (!acc[cur_num]) {
            acc[cur_num] = {};
        }
        if (!acc[cur_num][cur_course]) {
            acc[cur_num][cur_course] = [];
        }

        acc[cur_num][cur_course].push(cur_grade);
        return acc;
    }, {});

    let invalid = Object.values(matrikelnummern).map((cur) => {
      return Object.values(cur).filter((course) => course.length > 1)
    }).filter((list) => list.length > 0);

    return invalid.map((cur) => {
      return {
        matrikelnummer: cur[0][0].matrikelnummer,
        grades: cur
      }
    })
}
