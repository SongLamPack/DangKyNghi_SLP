// khai bao const

const URL =
  "https://script.google.com/macros/s/AKfycbwc9IDgaXhfBmXiUBrCZs_NtqxUTZpG_1O94Ab1wS-N2EnCoyChaM9YzMaqHMekebfScA/exec";

// khai bao bien

var dsns = [];
const btn = document.getElementById("btn");
const nameInput = document.getElementById("myid");
const dateInput = document.getElementById("mydate");
const resultEle = document.getElementById("result");
const modal = document.querySelector(".modal");

function render(data) {
  var innerHtml = "";
  for (var i = 1; i < data.length; i++) {
    innerHtml += `
    <div class="render">
        <h2 class ="${
          data[i].KetQua === 1 ? "done" : data[i].KetQua === -1 ? "fal" : "wait"
        }"> ${
      data[i].KetQua === 1
        ? "ĐƯỢC DUYỆT"
        : data[i].KetQua === -1
        ? "KHÔNG ĐƯỢC DUYỆT"
        : "ĐANG CHỜ"
    } </h2>
        <p>${data[0].MaNV}: ${data[i].MaNV}</p>
        <p>${data[0].HoTen}: ${data[i].HoTen}</p>
        <p>${data[0].TuNgay}: ${data[i].TuNgay}</p>
        <p>${data[0].DenNgay}: ${data[i].DenNgay}</p>
        <p>${data[0].SoNgayNghi}: ${data[i].SoNgayNghi}</p>
        <p>${data[0].CheDoNghi}: ${data[i].CheDoNghi}</p>
        <p>${data[0].NghiTu}: ${data[i].NghiTu}</p>
        <p>${data[0].NghiDen}: ${data[i].NghiDen}</p>
        <p>${data[0].GhiChu}: ${data[i].GhiChu}</p>
        <p class="${
          data[i].QLDuyet === "Duyệt"
            ? "done"
            : data[i].QLDuyet === "Không"
            ? "fal"
            : "wait"
        }">${data[0].QuanLy}: ${data[i].QuanLy} _${data[i].QLDuyet}</p>
        <p class="${
          data[i].TBPDuyet === "Duyệt"
            ? "done"
            : data[i].TBPDuyet === "Không"
            ? "fal"
            : "wait"
        }">${data[0].TruongBP}: ${data[i].TruongBP} _${data[i].TBPDuyet}</p>
        <p>${data[0].LyDo}: ${data[i].LyDo}</p>
    </div>
    <br>
    <hr />
    `;
  }
  resultEle.innerHTML = innerHtml;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  var name = nameInput.value;
  var date = dateInput.value; // new Date(+namInput.value, +thangInput.value, +ngayInput.value);
  var idate = parseInt(date.split("-").join(""));
  if (name === "") {
    alert("Vui lòng nhập mã nhân viên");
    return;
  }

  let submitData = {
    type: "check",
    data: {
      name,
      idate
    }
  };
  modal.classList.add("display");
  console.log(submitData);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // p data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      modal.classList.remove("display");
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      modal.classList.remove("display");
      resultEle.innerHTML = `
      <div class="render">
      <p>Không có kết quả nào phù hợp!</p>
      </div>
      `;
      // alert("không có kết quả nào, hãy kiểm tra thông tin tra cứu và thử lại");
    });
});

// btn.addEventListener("click", search);

// điều hướng
const welcomePg = document.getElementById("welcome");
const dkPg = document.getElementById("dangkypage");
const xemPg = document.getElementById("xempage");

const showDkBtn = document.getElementById("showDk");
const showXemBtn = document.getElementById("showXem");
const backBtns = document.querySelectorAll(".back");

function displayPg(pg) {
  const listPg = [welcomePg, dkPg, xemPg];
  listPg.forEach((pg) => pg.classList.add("hidden"));
  pg.classList.remove("hidden");
}

showDkBtn.addEventListener("click", () => {
  if (dsns.length === 0) {
    fetchDs();
  }
  displayPg(dkPg);
});
showXemBtn.addEventListener("click", () => {
  displayPg(xemPg);
});

backBtns.forEach((back) =>
  back.addEventListener("click", () => {
    displayPg(welcomePg);
  })
);

// fetch dsns

const fetchDs = (e) => {
  let submitData = {
    type: "dangky"
  };

  modal.classList.add("display");
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // p data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dsns = [...data];
      modal.classList.remove("display");
    })
    .catch((error) => {
      console.error("Error:", error);
      modal.classList.remove("display");
      alert("Không tìm thấy cơ sở dữ liệu nhân sự, vui lòng kiểm tra lại");
    });
};

// xem ds

const manvIp = document.querySelector("#dangkypage .maNV");
const tenIp = document.querySelector("#dangkypage .tenNV");
const boPhanIp = document.querySelector("#dangkypage .boPhan");
const chucVuIp = document.querySelector("#dangkypage .chucVu");
const nhomIp = document.querySelector("#dangkypage .nhom");
const resultSel = document.getElementById("dsquanly");

manvIp.addEventListener("input", (e) => {
  if (manvIp.value.length >= 7) {
    const nv = dsns.find(
      (nv) => nv.MaNV.toLowerCase() === manvIp.value.toLowerCase()
    );
    if (!nv) {
      tenIp.value = "không tìm thấy";
      tenIp.classList.add("fal");
      tenIp.classList.remove("wait");
      boPhanIp.value = "";
      chucVuIp.value = "";
    } else {
      tenIp.classList.remove("fal");
      tenIp.classList.add("wait");
      tenIp.value = nv.HoTen;
      boPhanIp.value = nv.BoPhan;
      chucVuIp.value = nv.ChucVu;
      var dsql = [];
        dsql = dsns.filter(
          (rs) =>
            rs.BoPhan.toLowerCase() === boPhanIp.value.toLowerCase() &&
            rs.CapDuyet !== ""
        );

      if (dsql.length > 0) {
        var innerSelect = `<select id="chonTT" class="chonquanly" >
        <option value="">- Chọn tổ trưởng / quản lý -</option>`;
        dsql.forEach(
          (rs) =>
            (innerSelect += `<option value ="${rs.HoTen}">${rs.HoTen}</option>`)
        );
        innerSelect += `</select>`;
        resultSel.innerHTML = innerSelect;
      } else {
        resultSel.innerHTML = "";
      }
    }
  } else {
    tenIp.value = "";
    boPhanIp.value = "";
    chucVuIp.value = "";
  }
});

//Check time
const checkTimeIp = document.querySelector("#dangkypage .checkTime");
const tuNgayIp = document.querySelector("#dangkypage .TuNgay");
const denNgayIp = document.querySelector("#dangkypage .DenNgay");
const nghiTuIp = document.querySelector("#dangkypage .NghiTu");
const nghiDenIp = document.querySelector("#dangkypage .NghiDen");
const cheDoNghi = document.querySelector("#dangkypage .cheDoNghi");
const ghiChu = document.querySelector("#dangkypage .ghiChu");
const resultHTML = document.getElementById("resultHTML");

checkTimeIp.addEventListener("change", (e) => {
  if (e.target.checked) {
    nghiTuIp.disabled = false;
    nghiDenIp.disabled = false;
    denNgayIp.value = tuNgayIp.value;
    denNgayIp.disabled = true;
    nghiTuIp.value = "08:00";
    nghiDenIp.value = "17:00";
  } else {
    nghiTuIp.disabled = true;
    nghiDenIp.disabled = true;
    denNgayIp.disabled = false;
    nghiTuIp.value = "";
    nghiDenIp.value = "";
  }
});

//gui dang ky
const btnGui = document.getElementById("btnGui");
btnGui.addEventListener("click", (e) => {
  e.preventDefault();
  const itime = new Date();
  var dauThoiGian = `${itime.getDate()}/${itime.getMonth()+1}/${itime.getFullYear()} ${itime.getHours()}:${itime.getMinutes()}:00`;

  let quanlyId = document.getElementById("chonTT");
  if (quanlyId != null) {
    var ngduyet = quanlyId.value;
  } else {
    var ngduyet = "";
  }
  if (manvIp.value === "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (tenIp.value === "" || tenIp.value === "không tìm thấy") {
    alert("Mã nhân viên chưa đúng, vui lòng kiểm tra lại");
    return;
  }
  if (tuNgayIp.value === "" || denNgayIp.value === "") {
    alert("Vui lòng nhập đầy đủ ngày tháng");
    return;
  }
  if (
    parseInt(tuNgayIp.value.toString().split("-").join("")) >
    parseInt(denNgayIp.value.toString().split("-").join(""))
  ) {
    alert(
      "Ngày tháng không hợp lệ, ngày bắt đầu không được nhỏ hơn ngày kết thúc"
    );
    return;
  }
  if (checkTimeIp.checked) {
    if (nghiTuIp.value === "" || nghiDenIp.value === "") {
      alert("Đăng ký nghỉ dưới 01 ngày, vui lòng nhập khoảng thời gian");
      return;
    } else {
      if (
        parseInt(nghiTuIp.value.toString().split(":").join("")) >=
        parseInt(nghiDenIp.value.toString().split(":").join(""))
      ) {
        alert(
          "Đăng ký nghỉ dưới 01 ngày. Khoảng thời gian không hợp lệ, thời gian bắt đầu phải nhỏ hơn thời gian kết thúc"
        );
        return;
      }
    }
  }

  let submitData = {
    type: "themmoi",
    data: {
      ThoiGian: dauThoiGian,
      MaNV: manvIp.value,
      HoTen: tenIp.value,
      BoPhan: boPhanIp.value,
      TuNgay: tuNgayIp.value,
      DenNgay: denNgayIp.value,
      CheDoNghi: cheDoNghi.value,
      NghiTu: nghiTuIp.value,
      NghiDen: nghiDenIp.value,
      GhiChu: ghiChu.value,
      QuanLy: ngduyet
    }
  };
  modal.classList.add("display");
  console.log(submitData);
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // p data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      modal.classList.remove("display");
      if (data == true) {
        alert(
          "✅ Đăng ký thành công! Vui lòng liên hệ với quản lý để được xác nhận"
        );
      } else {
        alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      modal.classList.remove("display");
      alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
    });
});
