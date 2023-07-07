// khai bao const

const URL =
  "https://script.google.com/macros/s/AKfycbySh0mtfujArGmttLxLIjHP_l0AnLGrFwtlD-NP5FEV8J_aDUuZ2pVew40fuf_PQyCn4A/exec";

// khai bao bien

var dsns = [];
const btn = document.getElementById("btn");
const nameInput = document.getElementById("myid");
const dateInput = document.getElementById("mydate");
const resultEle = document.getElementById("result");
const modal = document.querySelector(".modal");

// lấy thông tin nhân sự khi truy cập (đặt id thẻ div đầu tiên là loadpage)
// const load = document.getElementById("loadpage");
// document.addEventListener("DOMContentLoaded", fetchDs());

function render(data) {
  var innerHtml = "";
  for (var i = 1; i < data.length; i++) {
    innerHtml += `
    <div class="render" style="padding:20px">
        <h2 class ="${
          data[i].KetQua === 1 ? "done" : data[i].KetQua === -1 ? "fal" : "wait"
        }" style="text-align:center; margin:0; padding-bottom:20px"> ${
      data[i].KetQua === 1
        ? "ĐƯỢC DUYỆT"
        : data[i].KetQua === -1
        ? "KHÔNG ĐƯỢC DUYỆT"
        : "ĐANG CHỜ"
    } </h2>
        <p>${data[0].MaNV}: ${data[i].MaNV}</p>
        <p>${data[0].HoTen}: ${data[i].HoTen}</p>
        <p>${data[0].BoPhan}: ${data[i].BoPhan}</p>
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
        }">${data[0].QuanLy}: ${data[i].QuanLy} [${data[i].QLDuyet}]</p>
        <p class="${
          data[i].TBPDuyet === "Duyệt"
            ? "done"
            : data[i].TBPDuyet === "Không"
            ? "fal"
            : "wait"
        }">${data[0].TruongBP}: ${data[i].TruongBP} [${data[i].TBPDuyet}]</p>
        <p class="${
          data[i].KHDuyet === "Duyệt"
            ? "done"
            : data[i].KHDuyet === "Không"
            ? "fal"
            : "wait"
        }">${data[0].KHSX}: ${data[i].KHSX} [${data[i].KHDuyet}]</p>
        <p>${data[0].LyDo}: ${data[i].LyDo}</p>
    </div>
    <br>
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

const listItems = document.querySelectorAll(".menu li");
// Gắn sự kiện 'click' cho mỗi mục <li>
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    var pgname = this.getAttribute("value");
    if (pgname === "dangkypage") {
      fetchDs();
    }
    var pgclick = document.getElementById(pgname);
    if (pgclick !== null) {
      listItems.forEach((li) => {
        // Xóa class 'selected' khỏi tất cả các mục <li> khác
        li.classList.remove("active");
        var pgname = li.getAttribute("value");
        var pg = document.getElementById(pgname);
        try {
          pg.classList.add("hidden");
        } catch {}
      });
      // Thêm class 'selected' cho mục <li> vừa nhấp vào
      pgclick.classList.remove("hidden");
      this.classList.add("active");
    }
  });
});

function fetchDs() {
  if (dsns.length == 0) {
    let submitData = {
      type: "dangky"
    };
    console.log("đang lấy danh sách nhân sự");
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
  }
}

// xem ds

const manvIp = document.querySelector("#dangkypage .maNV");
const tenIp = document.querySelector("#dangkypage .tenNV");
const boPhanIp = document.querySelector("#dangkypage .boPhan");
const chucVuIp = document.querySelector("#dangkypage .chucVu");
const nhomIp = document.querySelector("#dangkypage .nhom");
const resultSel = document.getElementById("dsquanly");

manvIp.addEventListener("input", (e) => {
  manvIp.value = manvIp.value.toUpperCase();
  if (manvIp.value.length >= 7) {
    const nv = dsns.find(
      (nv) => nv.MaNV.toLowerCase() === manvIp.value.toLowerCase()
    );
    if (!nv) {
      tenIp.value = "không tìm thấy";
      tenIp.classList.add("fal");
      tenIp.classList.remove("done");
      boPhanIp.value = "";
      chucVuIp.value = "";
    } else {
      tenIp.classList.remove("fal");
      tenIp.classList.add("done");
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
const soGioPhutIP = document.querySelector("#dangkypage .SoGioPhut");
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
    soGioPhutIP.value = "8 giờ 0 ph";
  } else {
    nghiTuIp.disabled = true;
    nghiDenIp.disabled = true;
    denNgayIp.disabled = false;
    nghiTuIp.value = "";
    nghiDenIp.value = "";
    soGioPhutIP.value = "";
  }
});

nghiTuIp.addEventListener("change", tinh_so_gio);
nghiDenIp.addEventListener("change", tinh_so_gio);

function tinh_so_gio() {
  // var hmin = nghiTuIp.value.toString().split(":");
  // var hmax = nghiDenIp.value.toString().split(":");
  // if (parseInt(hmax[1]) >= parseInt(hmin[1])) {
  //   var soGio = parseInt(hmax[0]) - parseInt(hmin[0]);
  //   var soPhut = parseInt(hmax[1]) - parseInt(hmin[1]);
  // } else {
  //   var soGio = parseInt(hmax[0]) - parseInt(hmin[0]) - 1;
  //   var soPhut = 60 + parseInt(hmax[1]) - parseInt(hmin[1]);
  // }
  var nghitu = nghiTuIp.value;
  var nghiden = nghiDenIp.value;
  var tgTu = new Date(`0000-01-01 ${nghitu}`);
  var tgDen = new Date(`0000-01-01 ${nghiden}`);
  var tgNghi12 = new Date(`0000-01-01 12:00`);
  var tgNghi13 = new Date(`0000-01-01 13:00`);
  var tgNghi00 = new Date(`0000-01-01 00:00`);
  var tgNghi01 = new Date(`0000-01-01 01:00`);
  var tgNghi18 = new Date(`0000-01-01 18:00`);
  var phutgiam1 = 0;
  var phutgiam2 = 0;
  if (tgTu <= tgNghi13 && tgDen >= tgNghi12) {
    phutgiam1 = Math.min(
      60,
      ((((Math.min(tgDen, tgNghi13) - Math.max(tgTu, tgNghi12)) / 60000) %
        1440) +
        1440) %
        1440
    );
  }


  if ((tgTu <= tgNghi01 || tgTu >= tgNghi18) && tgDen >= tgNghi00) {
    phutgiam2 = Math.min(
      60,
      ((((Math.min(tgDen, tgNghi01) - (tgTu >= tgNghi18 ? tgNghi00 : tgTu)) /
        60000) %
        1440) +
        1440) %
        1440
    );
  }
  soGioPhutIP.value = phutgiam1;
  tenIp.value = phutgiam2;
  var phuttamtinh = (tgDen - tgTu) / 60000;
  var soPhut = (((phuttamtinh % 1440) + 1440) % 1440) - phutgiam1 - phutgiam2;
  // soGioPhutIP.value =soPhut;
  // soGioPhutIP.value = `${Math.floor(soPhut / 60)} giờ ${soPhut % 60} ph`;
}

//gui dang ky
const btnGui = document.getElementById("btnGui");
btnGui.addEventListener("click", (e) => {
  e.preventDefault();
  const itime = new Date();
  var dauThoiGian = `${itime.getDate()}/${
    itime.getMonth() + 1
  }/${itime.getFullYear()} ${itime.getHours()}:${itime.getMinutes()}:00`;

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
  var tungay = parseInt(tuNgayIp.value.toString().split("-").join(""));
  var denngay = parseInt(denNgayIp.value.toString().split("-").join(""));
  if (tungay > denngay) {
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
      if (parseInt(soGioPhutIP.value) >= 12) {
        alert(
          "Đăng ký nghỉ dưới 01 ngày. Khoảng thời gian không hợp lệ, thời gian nghỉ vượt quá 12 giờ"
        );
        return;
      }
    }
  }
  var startDate = new Date(tuNgayIp.value);
  var endDate = new Date(denNgayIp.value);
  var totalDays = 0;
  while (startDate <= endDate) {
    if (startDate.getDay() !== 0) {
      totalDays++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  var sogiophut = soGioPhutIP.value.split(" ");
  // console.log(sogiophut);
  var SoNgayNghi = checkTimeIp.checked
    ? Math.min(1, (parseInt(sogiophut[0]) + parseInt(sogiophut[2]) / 60) / 8)
    : totalDays;

  SoNgayNghi = Number.parseFloat(SoNgayNghi.toFixed(3));
  let submitData = {
    type: "themmoi",
    data: {
      ThoiGian: dauThoiGian,
      MaNV: manvIp.value,
      HoTen: tenIp.value,
      BoPhan: boPhanIp.value,
      TuNgay: tuNgayIp.value,
      DenNgay: denNgayIp.value,
      CheDoNghi: cheDoNghi.options[cheDoNghi.selectedIndex].textContent,
      NghiTu: nghiTuIp.value,
      NghiDen: nghiDenIp.value,
      GhiChu: ghiChu.value,
      SoNgayNghi: SoNgayNghi,
      KyHieu: cheDoNghi.value,
      QuanLy: ngduyet
    }
  };
  let qs = confirm(
    `XÁC NHẬN! \nGửi đăng ký ${
      cheDoNghi.options[cheDoNghi.selectedIndex].textContent
    } ${SoNgayNghi} ngày`
  );
  if (qs == true) {
    modal.classList.add("display");
    // console.log(submitData);
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
        // console.log(data);
        modal.classList.remove("display");
        if (data == true) {
          alert(
            "✅ Đăng ký thành công! Vui lòng liên hệ với quản lý để được xác nhận"
          );
          manvIp.value = "";
          tuNgayIp.value = "";
          denNgayIp.value = "";
          checkTimeIp.checked = false;
          ghiChu.value = "";
        } else {
          alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        modal.classList.remove("display");
        alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
      });
  }
});
