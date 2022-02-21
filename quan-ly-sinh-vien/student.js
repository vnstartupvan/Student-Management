function Student (id, name, email, dob, course, math, physic, chemistry) {
    this.id = id;
    this.name = name;
    this.email = email;
    // this.password = Math.round(Math.random()* 1000000).toString();
    this.dob = dob;
    this.course = course;
    this.math = math*1;
    this.physic = physic*1;
    this.chemistry = chemistry*1;
    this.calcAverage = function () {
        var averageGrade =(this.math + this.physic + this.chemistry )/3;
        return averageGrade;
    }
}
