$(document).ready(function () {
  if (window.location.hostname == tmbq) {
    $('head').append(cssCrop)
    $('head').append(jsCrop)
    $('.btn-chonnen').one('click', function () {
      _0xd42ff6()
    })
    var _0x1570c5,
      _0x2679ea = '',
      _0x1e78a1
    $('.xulyhinhanh').append('<input class="dk1 d-none" value="">')
    var _0x596cd6 = $('.dk1').val()
    function _0xd42ff6() {
      $('.chonnen').html('')
      for (var _0x3ab3cc = 0; _0x3ab3cc < hinhnen.length; _0x3ab3cc++) {
        $('.chonnen').append(
          "<div class='col mb-3 text-center'><img alt='Hình nền' class='img-thumbnail' src='" +
            hinhnen[_0x3ab3cc].replace(/.jpg/g, 'm.jpg') +
            "'></div>"
        )
      }
      $('#cropanh').click(function () {
        $('.dk1').val(1)
        $('.chonnen div').removeClass('active')
      })
      $('.chonnen div').click(function () {
        $('.btn-chonnen').html("<i class='fas fa-image'></i> Chọn nền khác")
        $('.dk1').val(1)
        $('.img-preview img').hide()
        $('.chonnen div').removeClass('active')
        $(this).addClass('active')
        var _0x775bf6 = $(this).children().attr('src').replace(/m.jpg/g, '.jpg')
        _0x2679ea = _0x775bf6
        _0x1570c5 = 0
        $('.img-preview')
          .css('background-image', 'url(' + _0x775bf6 + ')')
          .css('background-size', 'cover')
          .css('background-position', 'center')
        $('#chonanhModal').modal('hide')
      })
    }
    var _0x500910 = 'SVN-Suargie',
      _0x408e2b = '200px',
      _0xcfc7c5 = 1
    $('#font1').click(function () {
      _0x500910 = 'SVN-Suargie'
      _0x408e2b = '200px'
    })
    $('#font2').click(function () {
      _0x500910 = 'UTM Alpine KT'
      _0x408e2b = '170px'
    })
    $('#font3').click(function () {
      _0x500910 = 'SVN-Skill'
      _0x408e2b = '220px'
    })
    $('#dong1').click(function () {
      _0xcfc7c5 = 1
      $('.tad-in-text2').hide()
      $('.tad-in-text3').hide()
      _0x4e4e14()
    })
    $('#dong2').click(function () {
      _0xcfc7c5 = 2
      $('.tad-in-text2').show()
      $('.tad-in-text3').hide()
      _0x4e4e14()
    })
    $('#dong3').click(function () {
      _0xcfc7c5 = 3
      $('.tad-in-text2').show()
      $('.tad-in-text3').show()
      _0x4e4e14()
    })
    var _0x16ab88 = $('.tad-in-text1'),
      _0x49f981 = $('.tad-in-text2'),
      _0x57258a = $('.tad-in-text3')
    _0x16ab88.on('input', function () {
      _0x4e4e14()
    })
    _0x49f981.on('input', function () {
      _0x4e4e14()
    })
    _0x57258a.on('input', function () {
      _0x4e4e14()
    })
    function _0x4e4e14() {
      _0xcfc7c5 == 1 &&
        (_0x16ab88.val().length == 0
          ? $('#tad-taoanh').addClass('disabled')
          : $('#tad-taoanh').removeClass('disabled'))
      _0xcfc7c5 == 2 &&
        (_0x16ab88.val().length == 0 || _0x49f981.val().length == 0
          ? $('#tad-taoanh').addClass('disabled')
          : $('#tad-taoanh').removeClass('disabled'))
      _0xcfc7c5 == 3 &&
        (_0x16ab88.val().length == 0 ||
        _0x49f981.val().length == 0 ||
        _0x57258a.val().length == 0
          ? $('#tad-taoanh').addClass('disabled')
          : $('#tad-taoanh').removeClass('disabled'))
    }
    var _0x3254a6 = true,
      _0x1ceab2 = false
    $('#phatsang').click(function () {
      _0x3254a6 = _0x1ceab2
      _0x1ceab2 = !_0x1ceab2
    })
    var _0x2f8bf9
    function _0x2f450a(
      _0x303393,
      _0x15d4b9,
      _0x4645d0,
      _0x244715,
      _0x394647,
      _0x1bd9e8
    ) {
      var _0x4d3aee = _0x15d4b9.split(' '),
        _0x641f22 = ''
      for (var _0x145ddd = 0; _0x145ddd < _0x4d3aee.length; _0x145ddd++) {
        var _0x45bdd7 = _0x641f22 + _0x4d3aee[_0x145ddd] + ' ',
          _0x107160 = _0x303393.measureText(_0x45bdd7),
          _0x32ab6a = _0x107160.width
        _0x32ab6a > _0x394647 && _0x145ddd > 0
          ? (_0x303393.fillText(_0x641f22, _0x4645d0, _0x244715),
            (_0x641f22 = _0x4d3aee[_0x145ddd] + ' '),
            (_0x244715 += _0x1bd9e8))
          : (_0x641f22 = _0x45bdd7)
      }
      _0x2f8bf9 = _0x244715 - 500
      _0x303393.fillText(_0x641f22, _0x4645d0, _0x244715)
    }
    function _0x3fc41d() {
      document.fonts.load("10pt '" + _0x500910 + "'").then(function () {
        document.fonts.load('10pt "Montserrat"').then(function () {
          var _0x18b191 = new Image()
          _0x18b191.crossOrigin = 'Anonymous'
          _0x1570c5 == 0
            ? (_0x18b191.src = _0x2679ea)
            : (_0x18b191.src =
                'https://1.bp.blogspot.com/-z3RZ2G93tVo/YHES6yUdnzI/AAAAAAAArsw/Jq_pD24Pn-sEW-XwzGl18qlgIYQZZOeqgCNcBGAsYHQ/s0/blank.png')
          _0x18b191.onload = function () {
            var _0x432a03 = document.getElementById('temp'),
              _0x41fdfb = _0x432a03.getContext('2d')
            _0x41fdfb.save()
            _0x1570c5 == 0
              ? _0x41fdfb.drawImage(
                  _0x18b191,
                  0,
                  0,
                  _0x432a03.width,
                  _0x432a03.height
                )
              : _0x41fdfb.drawImage(
                  _0x1e78a1,
                  0,
                  0,
                  _0x432a03.width,
                  _0x432a03.height
                )
            _0x41fdfb.restore()
            _0x41fdfb.save()
            _0x41fdfb.fillStyle = 'rgba(30,30,30,0.5)'
            _0x41fdfb.fillRect(0, 0, _0x432a03.width, _0x432a03.height)
            _0x41fdfb.restore()
            var _0x1ffa93 = $('.tad-in-text1').val(),
              _0x5aa292 = $('.tad-in-text2').val(),
              _0x1d504b = $('.tad-in-text3').val(),
              _0x53f7ba = _0x408e2b + ' ' + _0x500910
            _0x41fdfb.save()
            _0x3254a6 == true &&
              ((_0x41fdfb.shadowBlur = 30),
              (_0x41fdfb.shadowColor = 'rgba(255,255,255, 0.8)'))
            _0xcfc7c5 == 1 &&
              (_0x41fdfb.save(),
              (_0x41fdfb.fillStyle = '#fff'),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = _0x53f7ba),
              _0x41fdfb.fillText(
                _0x1ffa93,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + 60
              ),
              _0x41fdfb.restore())
            _0xcfc7c5 == 2 &&
              (_0x41fdfb.save(),
              (_0x41fdfb.fillStyle = '#fff'),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = _0x53f7ba),
              _0x41fdfb.fillText(
                _0x1ffa93,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + 40
              ),
              _0x41fdfb.restore(),
              _0x41fdfb.save(),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = '50px Montserrat'),
              (_0x41fdfb.fillStyle = '#fff'),
              _0x2f450a(
                _0x41fdfb,
                _0x5aa292,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + 130,
                1300,
                60
              ),
              _0x41fdfb.restore())
            _0xcfc7c5 == 3 &&
              (_0x41fdfb.save(),
              (_0x41fdfb.fillStyle = '#fff'),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = _0x53f7ba),
              _0x41fdfb.fillText(
                _0x1ffa93,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + 20
              ),
              _0x41fdfb.restore(),
              _0x41fdfb.save(),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = '50px Montserrat'),
              (_0x41fdfb.fillStyle = '#fff'),
              _0x2f450a(
                _0x41fdfb,
                _0x5aa292,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + 110,
                1300,
                60
              ),
              _0x41fdfb.restore(),
              _0x41fdfb.save(),
              (_0x41fdfb.textAlign = 'center'),
              (_0x41fdfb.font = '40px Montserrat'),
              (_0x41fdfb.fillStyle = '#fff'),
              _0x2f450a(
                _0x41fdfb,
                _0x1d504b,
                _0x432a03.width / 2,
                _0x432a03.height / 2 + _0x2f8bf9 + 60,
                1300,
                50
              ),
              _0x41fdfb.restore())
            _0x41fdfb.restore()
            tadUpload(_0x432a03)
          }
        })
      })
    }
    _0x3fc41d()
    $('#tad-taoanh').click(function () {
      if ($('.dk1').val() == '') {
        return (
          alert('Vui lòng chọn nền'),
          _0xd42ff6(),
          $('#chonanhModal').modal('show'),
          false
        )
      }
      $('#img-out').hide()
      $('#tad-taoanh')
        .addClass('disabled')
        .html(
          "<span class='spinner-border spinner-border-sm'></span> Đang tạo ảnh"
        )
      _0x3fc41d()
    })
    $('#chonanhModal').on('hidden.bs.modal', function () {
      $('.cropanh-container').css('display') != 'none' &&
        $('#upanh').css('display') != 'none' && $('#cropanh').click()
    })
    window.onload = function () {
      var _0x141cda = window.Cropper,
        _0x4e42bb = window.URL || window.webkitURL,
        _0x581a0c = document.querySelector('.img-container'),
        _0x1d28e2 = _0x581a0c.getElementsByTagName('img').item(0),
        _0x3da999 = document.getElementById('actions'),
        _0x5a2d65 = {
          aspectRatio: tyle,
          viewMode: vmode,
          preview: '.img-preview',
          autoCrop: true,
          strict: true,
          background: true,
          autoCropArea: 1,
        },
        _0x2b9782 = new _0x141cda(_0x1d28e2, _0x5a2d65),
        _0x32a716 = _0x1d28e2.src,
        _0x516fbb = 'image/jpeg',
        _0x5e7043
      !document.createElement('canvas').getContext &&
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true)
      typeof document.createElement('cropper').style.transition ===
        'undefined' &&
        ($('button[data-method="rotate"]').prop('disabled', true),
        $('button[data-method="scale"]').prop('disabled', true))
      _0x3da999.querySelector('.docs-buttons').onclick = function (_0x4d1fc9) {
        var _0x1016f9 = _0x4d1fc9 || window.event,
          _0x570fe4 = _0x1016f9.target || _0x1016f9.srcElement,
          _0xbb5413,
          _0x26f07d,
          _0xa5c7b0,
          _0x295870
        if (!_0x2b9782) {
          return
        }
        while (_0x570fe4 !== this) {
          if (_0x570fe4.getAttribute('data-method')) {
            break
          }
          _0x570fe4 = _0x570fe4.parentNode
        }
        if (
          _0x570fe4 === this ||
          _0x570fe4.disabled ||
          _0x570fe4.className.indexOf('disabled') > -1
        ) {
          return
        }
        _0x295870 = {
          method: _0x570fe4.getAttribute('data-method'),
          target: _0x570fe4.getAttribute('data-target'),
          option: _0x570fe4.getAttribute('data-option') || undefined,
          secondOption:
            _0x570fe4.getAttribute('data-second-option') || undefined,
        }
        _0xbb5413 = _0x2b9782.cropped
        if (_0x295870.method) {
          if (typeof _0x295870.target !== 'undefined') {
            _0xa5c7b0 = document.querySelector(_0x295870.target)
            if (
              !_0x570fe4.hasAttribute('data-option') &&
              _0x295870.target &&
              _0xa5c7b0
            ) {
              try {
                _0x295870.option = JSON.parse(_0xa5c7b0.value)
              } catch (_0x401ab0) {
                console.log(_0x401ab0.message)
              }
            }
          }
          switch (_0x295870.method) {
            case 'rotate':
              _0xbb5413 && _0x2b9782.clear()
              break
            case 'getCroppedCanvas':
              try {
                _0x295870.option = JSON.parse(_0x295870.option)
              } catch (_0x205b3d) {
                console.log(_0x205b3d.message)
              }
              _0x516fbb === 'image/jpeg' &&
                (!_0x295870.option && (_0x295870.option = {}),
                (_0x295870.option.fillColor = '#fff'))
              break
          }
          _0x26f07d = _0x2b9782[_0x295870.method](
            _0x295870.option,
            _0x295870.secondOption
          )
          switch (_0x295870.method) {
            case 'rotate':
              _0xbb5413 && _0x2b9782.crop()
              break
            case 'scaleX':
            case 'scaleY':
              _0x570fe4.setAttribute('data-option', -_0x295870.option)
              break
            case 'getCroppedCanvas':
              _0x26f07d &&
                ((_0x1e78a1 = _0x26f07d),
                (_0x1570c5 = 1),
                $('.img-preview img').show())
              break
            case 'destroy':
              _0x2b9782 = null
              _0x5e7043 &&
                (_0x4e42bb.revokeObjectURL(_0x5e7043),
                (_0x5e7043 = ''),
                (_0x1d28e2.src = _0x32a716))
              break
          }
          if (
            typeof _0x26f07d === 'object' &&
            _0x26f07d !== _0x2b9782 &&
            _0xa5c7b0
          ) {
            try {
              _0xa5c7b0.value = JSON.stringify(_0x26f07d)
            } catch (_0x2eddf7) {
              console.log(_0x2eddf7.message)
            }
          }
        }
      }
      document.body.onkeydown = function (_0x6177ad) {
        var _0x337fb3 = _0x6177ad || window.event
        if (!_0x2b9782 || this.scrollTop > 300) {
          return
        }
        switch (_0x337fb3.keyCode) {
          case 37:
            _0x337fb3.preventDefault(), _0x2b9782.move(-1, 0)
            break
          case 38:
            _0x337fb3.preventDefault(), _0x2b9782.move(0, -1)
            break
          case 39:
            _0x337fb3.preventDefault(), _0x2b9782.move(1, 0)
            break
          case 40:
            _0x337fb3.preventDefault(), _0x2b9782.move(0, 1)
            break
        }
      }
      $('.cropanh-container').hide()
      var _0x4ee9e6 = document.getElementById('inputImage')
      _0x4e42bb
        ? (_0x4ee9e6.onchange = function () {
            var _0x6a2448 = this.files,
              _0x9dba06
            _0x2b9782 &&
              _0x6a2448 &&
              _0x6a2448.length &&
              ((_0x9dba06 = _0x6a2448[0]),
              /^image\/\w+/.test(_0x9dba06.type)
                ? ((_0x516fbb = _0x9dba06.type),
                  _0x5e7043 && _0x4e42bb.revokeObjectURL(_0x5e7043),
                  (_0x1d28e2.src = _0x5e7043 =
                    _0x4e42bb.createObjectURL(_0x9dba06)),
                  _0x2b9782.destroy(),
                  (_0x2b9782 = new _0x141cda(_0x1d28e2, _0x5a2d65)),
                  (_0x4ee9e6.value = null),
                  $('.cropanh-container').show(),
                  $('.btn-upanh span,.btn-chonnen').html(
                    "<i class='fas fa-upload'></i> Chọn nền khác"
                  ))
                : window.alert('Vui lòng chọn một tệp hình ảnh.'))
          })
        : ((_0x4ee9e6.disabled = true),
          (_0x4ee9e6.parentNode.className += ' disabled'))
    }
  }
})
