// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// khai bao const

var URL = "https://script.google.com/macros/s/AKfycbwItnA9ne4r9u1qfQl9yGUZkFW99Wlq9HfksPYEyyLIuC-GQrClc7nSO0vSOrQHkU8UYQ/exec";

// khai bao bien

var dsns = [];
var btn = document.getElementById("btn");
var nameInput = document.getElementById("myid");
var dateInput = document.getElementById("mydate");
var resultEle = document.getElementById("result");
var modal = document.querySelector(".modal");
function render(data) {
  var innerHtml = "";
  for (var i = 1; i < data.length; i++) {
    innerHtml += "\n    <div class=\"render\">\n        <h2 class =\"".concat(data[i].KetQua === 1 ? "done" : data[i].KetQua === -1 ? "fal" : "wait", "\"> ").concat(data[i].KetQua === 1 ? "ĐƯỢC DUYỆT" : data[i].KetQua === -1 ? "KHÔNG ĐƯỢC DUYỆT" : "ĐANG CHỜ", " </h2>\n        <p>").concat(data[0].MaNV, ": ").concat(data[i].MaNV, "</p>\n        <p>").concat(data[0].HoTen, ": ").concat(data[i].HoTen, "</p>\n        <p>").concat(data[0].TuNgay, ": ").concat(data[i].TuNgay, "</p>\n        <p>").concat(data[0].DenNgay, ": ").concat(data[i].DenNgay, "</p>\n        <p>").concat(data[0].SoNgayNghi, ": ").concat(data[i].SoNgayNghi, "</p>\n        <p>").concat(data[0].CheDoNghi, ": ").concat(data[i].CheDoNghi, "</p>\n        <p>").concat(data[0].NghiTu, ": ").concat(data[i].NghiTu, "</p>\n        <p>").concat(data[0].NghiDen, ": ").concat(data[i].NghiDen, "</p>\n        <p>").concat(data[0].GhiChu, ": ").concat(data[i].GhiChu, "</p>\n        <p class=\"").concat(data[i].QLDuyet === "Duyệt" ? "done" : data[i].QLDuyet === "Không" ? "fal" : "wait", "\">").concat(data[0].QuanLy, ": ").concat(data[i].QuanLy, " _").concat(data[i].QLDuyet, "</p>\n        <p class=\"").concat(data[i].TBPDuyet === "Duyệt" ? "done" : data[i].TBPDuyet === "Không" ? "fal" : "wait", "\">").concat(data[0].TruongBP, ": ").concat(data[i].TruongBP, " _").concat(data[i].TBPDuyet, "</p>\n        <p>").concat(data[0].LyDo, ": ").concat(data[i].LyDo, "</p>\n    </div>\n    <br>\n    <hr />\n    ");
  }
  resultEle.innerHTML = innerHtml;
}
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var name = nameInput.value;
  var date = dateInput.value; // new Date(+namInput.value, +thangInput.value, +ngayInput.value);
  var idate = parseInt(date.split("-").join(""));
  if (name === "") {
    alert("Vui lòng nhập mã nhân viên");
    return;
  }
  var submitData = {
    type: "check",
    data: {
      name: name,
      idate: idate
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
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    modal.classList.remove("display");
    render(data);
  }).catch(function (error) {
    console.error("Error:", error);
    modal.classList.remove("display");
    resultEle.innerHTML = "\n      <div class=\"render\">\n      <p>Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3 n\xE0o ph\xF9 h\u1EE3p!</p>\n      </div>\n      ";
    // alert("không có kết quả nào, hãy kiểm tra thông tin tra cứu và thử lại");
  });
});

// btn.addEventListener("click", search);

// điều hướng
var welcomePg = document.getElementById("welcome");
var dkPg = document.getElementById("dangkypage");
var xemPg = document.getElementById("xempage");
var showDkBtn = document.getElementById("showDk");
var showXemBtn = document.getElementById("showXem");
var backBtns = document.querySelectorAll(".back");
function displayPg(pg) {
  var listPg = [welcomePg, dkPg, xemPg];
  listPg.forEach(function (pg) {
    return pg.classList.add("hidden");
  });
  pg.classList.remove("hidden");
}
showDkBtn.addEventListener("click", function () {
  if (dsns.length === 0) {
    fetchDs();
  }
  displayPg(dkPg);
});
showXemBtn.addEventListener("click", function () {
  displayPg(xemPg);
});
backBtns.forEach(function (back) {
  return back.addEventListener("click", function () {
    displayPg(welcomePg);
  });
});

// fetch dsns

var fetchDs = function fetchDs(e) {
  var submitData = {
    type: "dangky"
  };
  modal.classList.add("display");
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(submitData) // p data type must match "Content-Type" header
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    dsns = _toConsumableArray(data);
    modal.classList.remove("display");
  }).catch(function (error) {
    console.error("Error:", error);
    modal.classList.remove("display");
    alert("Không tìm thấy cơ sở dữ liệu nhân sự, vui lòng kiểm tra lại");
  });
};

// xem ds

var manvIp = document.querySelector("#dangkypage .maNV");
var tenIp = document.querySelector("#dangkypage .tenNV");
var boPhanIp = document.querySelector("#dangkypage .boPhan");
var chucVuIp = document.querySelector("#dangkypage .chucVu");
var nhomIp = document.querySelector("#dangkypage .nhom");
var resultSel = document.getElementById("dsquanly");
manvIp.addEventListener("input", function (e) {
  if (manvIp.value.length >= 7) {
    var nv = dsns.find(function (nv) {
      return nv.MaNV.toLowerCase() === manvIp.value.toLowerCase();
    });
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
      if (nv.CapDuyet === "") {
        dsql = dsns.filter(function (rs) {
          return rs.BoPhan.toLowerCase() === boPhanIp.value.toLowerCase() && rs.CapDuyet !== "";
        });
      } else {
        dsql = dsns.filter(function (rs) {
          return rs.Nhom.toLowerCase() === nv.Nhom.toLowerCase() && rs.CapDuyet.toLowerCase() === "trưởng bộ phận";
        });
      }
      if (dsql.length > 0) {
        var innerSelect = "<select id=\"chonTT\" class=\"chonquanly\" >\n        <option value=\"\">- Ch\u1ECDn t\u1ED5 tr\u01B0\u1EDFng / qu\u1EA3n l\xFD -</option>";
        dsql.forEach(function (rs) {
          return innerSelect += "<option value =\"".concat(rs.HoTen, "\">").concat(rs.HoTen, "</option>");
        });
        innerSelect += "</select>";
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
var checkTimeIp = document.querySelector("#dangkypage .checkTime");
var tuNgayIp = document.querySelector("#dangkypage .TuNgay");
var denNgayIp = document.querySelector("#dangkypage .DenNgay");
var nghiTuIp = document.querySelector("#dangkypage .NghiTu");
var nghiDenIp = document.querySelector("#dangkypage .NghiDen");
var cheDoNghi = document.querySelector("#dangkypage .cheDoNghi");
var ghiChu = document.querySelector("#dangkypage .ghiChu");
var resultHTML = document.getElementById("resultHTML");
checkTimeIp.addEventListener("change", function (e) {
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
var btnGui = document.getElementById("btnGui");
btnGui.addEventListener("click", function (e) {
  e.preventDefault();
  var itime = new Date();
  var dauThoiGian = "".concat(itime.getDate(), "/").concat(itime.getMonth(), "/").concat(itime.getFullYear(), " ").concat(itime.getHours(), ":").concat(itime.getMinutes(), ":00");
  var quanlyId = document.getElementById("chonTT");
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
  if (parseInt(tuNgayIp.value.toString().split("-").join("")) > parseInt(denNgayIp.value.toString().split("-").join(""))) {
    alert("Ngày tháng không hợp lệ, ngày bắt đầu không được nhỏ hơn ngày kết thúc");
    return;
  }
  if (checkTimeIp.checked) {
    if (nghiTuIp.value === "" || nghiDenIp.value === "") {
      alert("Đăng ký nghỉ dưới 01 ngày, vui lòng nhập khoảng thời gian");
      return;
    } else {
      if (parseInt(nghiTuIp.value.toString().split(":").join("")) >= parseInt(nghiDenIp.value.toString().split(":").join(""))) {
        alert("Đăng ký nghỉ dưới 01 ngày. Khoảng thời gian không hợp lệ, thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
        return;
      }
    }
  }
  var submitData = {
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
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    modal.classList.remove("display");
    if (data == true) {
      alert("✅ Đăng ký thành công! Vui lòng liên hệ với quản lý để được xác nhận");
    } else {
      alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
    }
  }).catch(function (error) {
    console.error("Error:", error);
    modal.classList.remove("display");
    alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
  });
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36735" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map