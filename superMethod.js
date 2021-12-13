(function () {
  var ascii = `
  _    _      _ _        __          __        _     _ 
 | |  | |    | | |       \\ \\        / /       | |   | |
 | |__| | ___| | | ___    \\ \\  /\\  / /__  _ __| | __| |
 |  __  |/ _ \\ | |/ _ \\    \\ \\/  \\/ / _ \\| '__| |/ _\` |
 | |  | |  __/ | | (_) |    \\  /\\  / (_) | |  | | (_| |
 |_|  |_|\\___|_|_|\\___/      \\/  \\/ \\___/|_|  |_|\\__,_|                                                                                                                                                                                  
`
  console.log(`%c${ascii}`, 'color:#e59de3')
  console.log('%c想学啊，我教你呀！',
    `padding: 10px 40px;
  font-size: 24px;
  font-weight: 600;
  color:#eee;
  background:
  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%),
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%),
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%),
  radial-gradient(circle closest-side at 60% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 43%, #b03 26%, rgba(187,0,51,0) 27%) 50px 50px,
  radial-gradient(circle closest-side at 40% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 60% 22%, #d35 45%, rgba(221,51,85,0) 46%) 50px 50px,
  radial-gradient(circle closest-side at 50% 35%, #d35 30%, rgba(221,51,85,0) 31%) 50px 50px;
  background-color:#b03;
  background-size:100px 100px;`)
  var pname = null
  let text = ''
  let styleText = '需要点击使用样式才可获取到样式'
  let header_one = document.getElementById("header_one")
  let header_two = document.getElementById("header_two")
  let header_three = document.getElementById("header_three")
  let copy = document.getElementById("copy")
  let copyStyle = document.getElementById("copyStyle")
  document.getElementById("document").addEventListener("change", handleFileSelect);
  let output = document.getElementById("output")
  let output_code = document.getElementById("output_code")
  let output_style = document.getElementById("output_style")
  let output_null = document.getElementById("output_null")

  document.getElementById('copy').addEventListener('click', function () {
    var clipboard = new ClipboardJS('#copy')
    clipboard.on('success', function (e) {
      e.clearSelection();//清除选中样式（蓝色）
    })

  })
  document.getElementById('copyStyle').addEventListener('click', function () {
    var clipboard = new ClipboardJS('#copyStyle')
    clipboard.on('success', function (e) {
      e.clearSelection();
    })

  })

  document.getElementById('huoqu').addEventListener('click', function () {
    let lione = document.getElementById('box_ul').getElementsByTagName('input')
    pname = document.getElementById('className').value
    arr = ['margin-bottom: 0.426667rem']
    for (var i = 0; i < lione.length; i++) {
      switch (i) {
        case 0:
          arr.push(`color:${lione[i].value ? lione[i].value : 0}`)
          break
        case 1:
          arr.push(`font-size:${lione[i].value ? lione[i].value : 14}px`)
          break
        case 2:
          arr.push(`text-indent:${lione[i].value ? lione[i].value : 0}em`)
          break
        case 3:
          arr.push(`letter-spacing:${lione[i].value ? lione[i].value : 0}px`)
          break
      }
    }
    let cssStyle = arr.join(';')
    editStyle(cssStyle, pname)
  })

  //设置列表的一些样式
  function editStyle(i, pname = 'text') {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ` ${pname ? `.${pname}` : '.text'}{${i}}`;
    output_style.innerText = style.innerHTML
    document.getElementsByTagName('head').item(0).appendChild(style);
  }

  //控制功能栏
  let temp = 0 //0为显示
  let box = document.getElementById('box')
  document.getElementById('InvincibleShow').addEventListener('click', function () {
    if (temp === 0) {
      box.setAttribute('style', 'display:none;border:none');
      temp = 1
    } else {
      box.setAttribute('style', 'display:flex;border:#000 solid 1px');
      temp = 0
    }
  })

  // 控制Output
  function OutputTab() {
    document.getElementById("header_one").addEventListener('click', function () {
      output.style.display = 'block'
      output_code.style.display = 'none'
      output_style.style.display = 'none'
      header_one.style.borderBottom = 'none'
      copyStyle.style.display = 'none'
      copy.style.display = 'none'
      header_two.style.borderBottom = '#409eff solid 1px'
      header_three.style.borderBottom = '#409eff solid 1px'
    })
    document.getElementById("header_two").addEventListener('click', function () {
      output.style.display = 'none'
      output_code.style.display = 'block'
      output_style.style.display = 'none'
      copyStyle.style.display = 'none'
      copy.style.display = 'block'
      header_two.style.borderBottom = 'none'
      header_one.style.borderBottom = '#409eff solid 1px'
      header_three.style.borderBottom = '#409eff solid 1px'
    })
    document.getElementById("header_three").addEventListener('click', function () {
      output.style.display = 'none'
      output_code.style.display = 'none'
      output_style.style.display = 'block'
      copyStyle.style.display = 'block'
      copy.style.display = 'none'
      header_three.style.borderBottom = 'none'
      header_two.style.borderBottom = '#409eff solid 1px'
      header_one.style.borderBottom = '#409eff solid 1px'
    })
  }

  function handleFileSelect(event) {
    readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(displayResult)
        .done();
    });
  }

  // 对编译后的文本进行 过滤添加样式和class
  function displayResult(result) {
    let html = result.value;
    let newHTML = html.replace(/&/g, '')
      .replace(/<table>/g, `<table style="border-collapse: collapse;width:100%;">`)
      .replace(/<tr>/g, `<tr style="height: 30px;">`)
      .replace(/<td>/g, `<td style="border: 1px solid #000;">`)
      .replace(/<p>/g, `<p class='${pname ? `.${pname}` : 'text'}'>`)
    OutputTab();
    text = newHTML
    initBox()
    header_one.style.borderBottom = 'none'
    document.getElementById("output").innerHTML = newHTML;
    document.getElementById("output_code").innerText = newHTML;
  }

  function initBox() {
    output_null.style.display = 'none';
    output.style.display = 'block';
    header_one.style.borderBottom = 'none'
    output_code.style.display = 'none'
    header_two.style.borderBottom = '#409eff solid 1px'
    copy.style.display = 'none'
    output_style.style.display = 'none'
    header_three.style.borderBottom = '#409eff solid 1px'
    output_style.innerText = styleText
  }

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

})();