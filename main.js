/* 
Dự án: Quản lý sinh viên
Chức năng chính: 
- Thêm sinh viên vào danh sách
- Hiển thị sinh viên ra bảng
- Xóa sinh viên
- Cập nhật thông tin sinh viên
- Tìm kiếm sinh viên
- Validation
*/

/* 
Các bước làm dự án:
- Đọc hiểu công việc trong dự án
- Xây dựng CSDL, phân tính các lớp đối tượng và thuộc tính, phương thức của lớp đối tượng 
- Lên giao diện
- Làm chức năng từ trên xuống dưới
*/
//Declaration : bi hoisting
// Expression function: kh bi hoisting
var textPattern = /[a-z]/g;
var numberPattern = /^[0-9]*$/;
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var inputID = [
  "#txtMaSV",
  "#txtTenSV",
  "#txtEmail",
  "#txtNgaySinh",
  "#khSV",
  "#txtDiemToan",
  "#txtDiemLy",
  "#txtDiemHoa",
];
// var studentList = [];
var studentList = [];
var createStudent = function () {
  
  //buoc 1 : lay du lieu nguoi dung nhap tu form
  var maSV = $(inputID[0]).val();
  var tenSV = $(inputID[1]).val();
  var email = $(inputID[2]).val();
  var ngaySinh = $(inputID[3]).val();
  var khoaHoc = $(inputID[4]).val();
  var diemToan = $(inputID[5]).val();
  var diemLy = $(inputID[6]).val();
  var diemHoa = $(inputID[7]).val();
    //kiem tra validation 
  required(maSV, "#spanMaSV")
  required(tenSV, "#spanTenSV")&& checkPattern(textPattern,tenSV,"#spanTenSV","chữ")
  required(email, "#spanEmailSV")&&checkPattern(emailPattern,email,"#spanEmailSV","email")
  required(ngaySinh,"#spanNgaySinh")
  checkCourse("#khSV","Khóa học","#spanKhoaHoc");
  required(diemToan, "#spanToan") && checkPattern(numberPattern,diemToan, "#spanToan", "số");
  required(diemLy,"#spanLy") && checkPattern(numberPattern,diemLy,"#spanLy", "số");
  required(diemHoa, "#spanHoa") && checkPattern(numberPattern,diemHoa, "#spanHoa", "số");

  if (!checkValidation()) {
    return
  }

  //buoc 2: tu nhung thong tin lay duoc new ra mot doi tuong sinh vien
  var newStudent = new Student(
    maSV,
    tenSV,
    email,
    ngaySinh,
    khoaHoc,
    diemToan,
    diemLy,
    diemHoa
  );
  //buoc 3.1: check co trung id hay khong, co thi bao loi
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].id === newStudent.id) {
      alert("Trung ma sv");
      console.log(studentList)
      return;
    }
  }
  //buoc 3: push sinh vien moi vao danh sach

  studentList.push(newStudent);
  renderHTML();
  saveData()
}
  // buoc 4:render html
  var renderHTML = (data) => {
    //cach 2
    // var abc = data || studentList 
    if(!data) {
      data = studentList;
    }
    var htmlContent = "";
    for (var i = 0; i < data.length; i++) {
      htmlContent += `<tr>
          <td>${data[i].id}</td>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
          <td>${data[i].dob}</td>
          <td>${data[i].course}</td>
          <td>${data[i].calcAverage()}</td>
          <td><button onclick="deleteStudent('${data[i].id}')" class="btn btn-danger">Xoa</button></td>
          <td><button onclick="getStudent('${data[i].id}')" class="btn btn-success">Sua</button></td>
          </tr>
          `;
    }
    $("#tbodySinhVien").html(htmlContent)
  };



// //buoc 5: luu data vao localstorage 
var saveData = function() {
    // chuyen sang JSON 
    var json = JSON.stringify(studentList)
    localStorage.setItem("data",json)
}
// //render html xong -> run save data
// saveData()
// //function delete student 
var deleteStudent = (id) => {
    //tim vi tri cua ID
    var foundIndex = findStudentByID(id);
    if(foundIndex === -1) {
        alert("id khong hop le");
        return
    } 
    studentList.splice(foundIndex, 1);
    saveData()
    renderHTML()
}

// Cap nhat 1: dua du lieu cua sinh vien muon sua len o form 
var getStudent = (id)=> {
  //b1: dua toan bo thong tin sinh vien len form 
  var foundIndex = findStudentByID(id);

  if(foundIndex === -1) {
    alert("ID is not existed")
    return;
  }

  var foundStudent = studentList[foundIndex]

  $(inputID[0]).val(foundStudent.id);
  $(inputID[1]).val(foundStudent.name);
  $(inputID[2]).val(foundStudent.email);
  $(inputID[3]).val(foundStudent.dob);
  $(inputID[4]).val(foundStudent.course);
  $(inputID[5]).val(foundStudent.math)*1;
  $(inputID[6]).val(foundStudent.physic)*1;
  $(inputID[7]).val(foundStudent.chemistry)*1;
  //b2: an nut them va hien nut luu thay doi
  $("#themSV").hide();
  $("#suaSV").show();
  //b3: disable ma Sinh Vien
  $("#txtMaSV").prop('disabled', true);
}
  // Cap nhat 2: cho phep nguoi dung chinh sua thong tin tren form => save lai de cap nhat 
var updateStudent = ()=> {
  var maSV = $(inputID[0]).val();
  var tenSV = $(inputID[1]).val();
  var email = $(inputID[2]).val();
  var ngaySinh = $(inputID[3]).val();
  var khoaHoc = $(inputID[4]).val();
  var diemToan = $(inputID[5]).val()*1;
  var diemLy = $(inputID[6]).val()*1;
  var diemHoa = $(inputID[7]).val()*1;

  var foundIndex = findStudentByID(maSV);
  if(foundIndex === -1) {
    alert("ID is not existed")
    return;
  }
  var foundStudent = studentList[foundIndex];
  foundStudent.name = tenSV;
  foundStudent.email = email;
  foundStudent.dob = ngaySinh;
  foundStudent.course = khoaHoc;
  foundStudent.math = diemToan;
  foundStudent.physic = diemLy;
  foundStudent.chemistry = diemHoa;

  //reset lai  display button
  $("#themSV").show();
  $("#suaSV").hide();
  renderHTML();
  saveData();
}
// function tim kiem sinh vien
var searchStudent = () => {
  var keyword = $("#txtSearch").val();
  keyword = keyword.toLowerCase().trim();
  console.log(keyword)
  var result = [];

  for (var i=0; i<studentList.length; i++) {
    if(studentList[i].id == keyword) {
      result.push(studentList[i]);
      break;
    }

    if(studentList[i].name.toLowerCase().includes(keyword)) {
      result.push(studentList[i]);
    }
  }


  console.log(studentList);
  renderHTML(result)
  if(!result.length) {
    renderHTML()
  }
  console.log(result)
}
// $("#txtSearch").(function() {
//   searchStudent();
// })

var refreshForm = () => {
  $(inputID[0]).val("");
  $(inputID[1]).val("");
  $(inputID[2]).val("");
  $(inputID[3]).val("");
  $("#khSV").val(0);
  $(inputID[5]).val("");
  $(inputID[6]).val("");
  $(inputID[7]).val("");
  $("#txtMaSV").prop('disabled', false);
}
$("#resetBtn").click(function(){
  refreshForm()
})

// //function tim vi tri 
var findStudentByID = function (id) {
    // nhan id => tra index
    for(var i =0; i< studentList.length; i++) {
        if(studentList[i].id === id) {
            return i;
        }
    }
    return -1;
}
// //get data tu localstorage 
var getData = function () {
    var dataJson = localStorage.getItem("data")
    if(dataJson) {
        //JSON.parse()
        let data = JSON.parse(dataJson);
        //get data xong new lai instance moi cho class student de lay phuong thuc lai;
        for (var i =0; i<data.length; i++) {
            var newStudent = new Student (
                data[i].id,
                data[i].name,
                data[i].email,
                data[i].dob,
                data[i].course,
                data[i].math,
                data[i].physic,
                data[i].chemistry,
            );
            studentList.push(newStudent);
        }
        renderHTML();
    }
}
getData();
// // primitive type luu du lieu vao call stack
// // reference type luu du lieu vao memories heap
// // cach fix dung Object.assign({}, obj)
// var obj1= {a:2,b:2,c:2}
// var ob2 = Object.assign({},obj1)


// ------------VALIDATION: required/min length/ max length/ kiem tra pattern/ -----------------
var required = function (val, errorID) {
  if(val =="" || !val) {
    $(errorID).text("Vui lòng nhập");
    return false;
  }
  $(errorID).text("");
  return true;
}; 
var checkPattern = function (type,val,errorID,text) {
  if(!val.match(type)) {
    $(errorID).text(`Vui lòng nhập ${text}`);
    return false;
  }
  $(errorID).text("");
  return true;
}

// check validation for course
var checkCourse = function (id, errorText, errorID) {
  var courseID = $(id).prop('selectedIndex');
  if(courseID === 0) {
    $(errorID).show()
    $(errorID).text(`Vui lòng chọn ${errorText}`)
    return false;
  }
  $(errorID).hide()
  return true;
}

// check validation 
var checkValidation = function () {
  var maSV = $(inputID[0]).val();
  var tenSV = $(inputID[1]).val();
  var email = $(inputID[2]).val();
  var ngaySinh = $(inputID[3]).val();
  var diemToan = $(inputID[5]).val();
  var diemLy = $(inputID[6]).val();
  var diemHoa = $(inputID[7]).val();
  var result;
  var checkMaSV = required(maSV, "#spanMaSV")
  var checkTen = required(tenSV, "#spanTenSV")&& checkPattern(textPattern,tenSV,"#spanTenSV","chữ")
  var checkEmail = required(email, "#spanEmailSV")&&checkPattern(emailPattern,email,"#spanEmailSV","email")
  var checkDob = required(ngaySinh,"#spanNgaySinh")
  var checkKH = checkCourse("#khSV","Khóa học","#spanKhoaHoc");
  var checkMath = required(diemToan, "#spanToan") && checkPattern(numberPattern,diemToan, "#spanToan", "số");
  var checkPhysic = required(diemLy,"#spanLy") && checkPattern(numberPattern,diemLy,"#spanLy", "số");
  var checkChemistry = required(diemHoa, "#spanHoa") && checkPattern(numberPattern,diemHoa, "#spanHoa", "số");
  if(!checkMaSV || !checkTen || !checkEmail || !checkDob || !checkKH || !checkMath || !checkPhysic || !checkChemistry) {
    result = false;
    return result
  } 
  return true;
}

