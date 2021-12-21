/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
var platform;

var myModal;
var musicModal;
var captureModal;
var deviceBtnToggle = false;
var fileToggle = false;
var geotoggle = false;

var currmedia;
var currentMusic;
var prevButton;
var isMediaRunning = false;
var musicList = new Array();
var currMusicIndex = 0;

var volume = 0.3;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    myModal = new bootstrap.Modal($('#imageviewer'), {
                      keyboard: false
                    });

    musicModal = new bootstrap.Modal($('#mediaplayer'), {
                          keyboard: false
                        });

    captureModal = new bootstrap.Modal($('#mediacapture'), {
                              keyboard: false
                            });

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

//    console.log(device.model);
//
//    navigator.notification.alert(
//        device.model,  // message
//        alertDismissed,         // callback
//        'Device Model',            // title
//        '확 인'                  // buttonName
//    );
    $(document).ready(function() {
        platform = cordova.platformId;
/*
 * Dialog Plugin
*/
        $('#btnalert').click(function(){
            dialog.alert(
                                        "Cordova plug-in의 Alert를 사용하였습니다.",  // message
                                        alertDismissed,         // callback
                                        'Cordova로 띄운 창',            // title
                                        '확 인'                  // buttonName
                                    );
        });

        $('#btnjalert').click(function(){
                    alert("javascript alert 호출");
                });

        $('#btnconfirm').click(function() {
            dialog.confirm(
                "Cordova plug-in의 Confirm을 사용하였습니다.", // message
                 function(index) {
                    if (index == 1) {
                        alert('확인을 누르셨습니다!');
                    } else {
                        alert('취소를 누르셨습니다.');
                    }
                 },            // callback to invoke with index of button pressed
                'Cordova confirm test',           // title
                ['확 인','취 소']     // buttonLabels
            );
        });

        $('#btnprompt').click(function() {
                    dialog.prompt(
                        "Cordova plug-in의 Confirm을 사용하였습니다.", // message
                         function(result) {
                            if (result.buttonIndex == 1) {
                                alert('확인을 누르셨습니다! 입력신 값은 "' + result.input1 + '" 입니다.');
                            } else {
                                alert('취소를 누르셨습니다.');
                            }
                         },            // callback to invoke with index of button pressed
                        'Cordova prompt test',           // title
                        ['확 인','취 소'],          // buttonLabels
                        "기본 입력 값"
                    );
                });

        $('#btnbeep').click(function() {
            dialog.beep(3);
        });

        $('#btnjconfirm').click(function(){
                            if (confirm("javascript에서 띄운 confirm입니다.")) {
                                alert('확인을 누르셨습니다.');
                            } else {
                                alert('취소를 누르셨습니다.');
                            }
                        });

/*
 * Camera Plugin
*/
        $('#btncamera').click(function() {
            var options = {sourceType: Camera.PictureSourceType.CAMERA,
                           destinationType: Camera.DestinationType.FILE_URI,
                           correctOrientation: true,
                           saveToPhotoAlbum: true};

            navigator.camera.getPicture(cameraprocess.getPictureSuccessCallback,
                                        cameraprocess.getPictureErrorCallback,
                                        options);
        });

        $('#btnphotolib').click(function() {
            navigator.camera.getPicture(cameraprocess.getPictureSuccessCallback,
                                        cameraprocess.getPictureErrorCallback,
                                        {sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
        });

        $('.closemodal').click(function() {
            myModal.hide();
        });

/*
 * Device Plugin
*/
        $('#btndevice').click(function(){
            var str = ""

            if (deviceBtnToggle == false) {
                str += "device.cordova : " + device.cordova + "<br>";
                str += "device.model : " + device.model + "<br>";
                str += "device.platform : " + device.platform + "<br>";
                str += "device.uuid : " + device.uuid + "<br>";
                str += "device.version : " + device.version + "<br>";
                str += "device.manufacturer : " + device.manufacturer + "<br>";
                str += "device.isVirtual : " + device.isVirtual + "<br>";
                str += "device.serial : " + device.serial + "<br>";

                $('#deviceinfo').html(str);
                deviceBtnToggle = true;
            }
        });

/*
* File Plugin
*/
        $('#btnfile').click(function(){
             var str = ""

             if (fileToggle == false) {
                 str += '<li class="list-group-item">cordova.file.applicationDirectory : ' + cordova.file.applicationDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.applicationStorageDirectory : ' + cordova.file.applicationStorageDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.dataDirectory : ' + cordova.file.dataDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.cacheDirectory : ' + cordova.file.cacheDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.externalApplicationStorageDirectory : ' + cordova.file.externalApplicationStorageDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.externalDataDirectory : ' + cordova.file.externalDataDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.externalCacheDirectory : ' + cordova.file.externalCacheDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.externalRootDirectory : ' + cordova.file.externalRootDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.tempDirectory : ' + cordova.file.tempDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.syncedDataDirectory : ' + cordova.file.syncedDataDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.documentsDirectory : ' + cordova.file.documentsDirectory + '</li>';
                 str += '<li class="list-group-item">cordova.file.sharedDirectory : ' + cordova.file.sharedDirectory + '</li>';

                 $('#dirlist').html(str);
                 fileToggle = true;
             }
         });

/*
* Geolocation Plugin
*/
         $('#btngeo').click(function() {
            geo.getCurrentPosition(
                function(position) {
                    var str = ""

                     if (geotoggle == false) {
                         str += '<li class="list-group-item">Latitude: ' + position.coords.latitude + '</li>';
                         str += '<li class="list-group-item">Longitude: ' + position.coords.longitude + '</li>';
                         str += '<li class="list-group-item">Altitude: ' + position.coords.altitude + '</li>';
                         str += '<li class="list-group-item">Accuracy: ' + position.coords.accuracy + '</li>';
                         str += '<li class="list-group-item">Altitude Accuracy: ' + position.coords.altitudeAccuracy + '</li>';
                         str += '<li class="list-group-item">Heading: ' + position.coords.heading + '</li>';
                         str += '<li class="list-group-item">Speed: ' + position.coords.speed + '</li>';
                         str += '<li class="list-group-item">Timestamp: ' + position.timestamp + '</li>';

                         $('#geolist').html(str);
                         geotoggle = true;
                     }
                },
                function(error) {
                    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
                }
            );
         });

/*
* Inappbrowser Plugin
*/
         $('#btnib').click(function() {
            var option = 'location=yes,fullscreen=no,footer=yes,closebuttoncaption=닫기,footercolor=#20c997,toolbarcolor=#20c997';
            var ref = cordova.InAppBrowser.open('https://github.com/apache/cordova-plugin-inappbrowser', '_blank', option);
         });


/*
* Media Plugin
*/
        $('#btnmedia').click(function() {
            if (cordova.platformId == 'android') {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 4 : " + cordova.file.externalDataDirectory + "Music/");
                fileDir.getFileList(cordova.file.externalDataDirectory + "Music/");
            } else {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 4 : " + cordova.file.documentsDirectory + "Music/");
                fileDir.getFileList(cordova.file.documentsDirectory + "Music/");
            }
        })

        $('.closemodal').click(function() {
            musicModal.hide();
        });

        $('#btnplay').click(function() {
            if (isMediaRunning) {
                media.pause();
            } else {
                media.play();
            }
        })

        $('#btnstop').click(function() {
            media.stop();
        });

        $('#btnvoldown').click(function() {
            volume -= 0.1;

            if (volume < 0) {
                volume = 0;
            }

            media.setVolume(volume);
        });

        $('#btnvolup').click(function() {
            volume += 0.1;

            if (volume > 1.0) {
                volume = 1.0;
            }

            media.setVolume(volume);
        });

        $('#btnprev').click(function() {
            currMusicIndex = currMusicIndex - 1;
            if (currMusicIndex < 0) {
                currMusicIndex = musicList.length - 1;
            }

            $('#' + prevButton).removeClass('active');
            $('#music' + currMusicIndex).addClass('active');

            prevButton = 'music' + currMusicIndex;

            media.play(musicList[currMusicIndex]);
        });

        $('#btnnext').click(function() {
            currMusicIndex = currMusicIndex + 1;
            if (currMusicIndex >= musicList.length) {
                currMusicIndex = 0;
            }

            $('#' + prevButton).removeClass('active');
            $('#music' + currMusicIndex).addClass('active');

            prevButton = 'music' + currMusicIndex;

            media.play(musicList[currMusicIndex]);
        });

        $(document).on('click', 'a', function() {
            var linkid = $(this).attr('id');
            var music = $(this).text();

            if (linkid != undefined && linkid.indexOf("music") >= 0) {
                console.log(linkid + " : " + music);

                $('#' + linkid).addClass("active");

                if (linkid != prevButton) {
                    $('#' + prevButton).removeClass('active');
                }

                prevButton = linkid;

                media.play(music);
            }
        });

/*
* Media Capture Plugin
*/
        $('#btnacapture').click(function() {
            $('#limit').val('');
            $('#duration').val('');
            $('#captype').val("A");
            $('#mediacapture').modal('show', '#btnacapture');
        });

        $('#btnacipture').click(function() {
            $('#limit').val('');
            $('#duration').val('');
            $('#captype').val("I");
            $('#mediacapture').modal('show', '#btnacipture');
        });

        $('#btnacvpture').click(function() {
            $('#limit').val('');
            $('#duration').val('');
            $('#captype').val("V");
            $('#mediacapture').modal('show', '#btnacvpture');
        });

        $('#cancelmcmodal').click(function() {
            captureModal.hide();
        });

        $('#okmcmodal').click(function() {
          captureModal.hide();
        });

        $('#mediacapture').on('show.bs.modal', function (event) {
          // do something...
          if ($('#captype').val() == "I") {
            $("#duration").addClass("block_none");
          } else {
            $("#duration").removeClass("block_none");
          }
          var button = $(event.relatedTarget);
          console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Modal show event = " + button.data('title'));
        });

        $('#mediacapture').on('hide.bs.modal', function (event) {
            var $activeElement = $(document.activeElement);
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Modal show event = " + $activeElement.attr('id'));
            if ($activeElement.attr('id') == "okmcmodal") {
                  if ($('#captype').val() == "I") {
                    mcapture.imgCapture($('#limit').val());
                  } else if ($('#captype').val() == "A") {
                    mcapture.audioCapture($('#limit').val(), $('#duration').val());
                  } else {
                    mcapture.videoCapture($('#limit').val(), $('#duration').val());
                  }
              }
        });


/*
* Network Plugin
*/
        document.addEventListener("offline", function() {
            alert("네트워크가 offline 상태입니다.")
        }, false);

        document.addEventListener("online", function() {
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Network is Online");
        }, false);



        $('#btnnet').click(function() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
        });

/*
* Network Plugin
*/

        window.addEventListener("orientationchange", function(){
            alert("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ screen.orientation.type = " + screen.orientation.type); // e.g. portrait
        });

        $('#btnport').click(function() {
            screen.orientation.lock('portrait-primary');
        });

        $('#btnrport').click(function() {
            screen.orientation.lock('portrait-secondary');
        });

        $('#btnrland').click(function() {
            screen.orientation.lock('landscape-primary');
        });

        $('#btnlland').click(function() {
            screen.orientation.lock('landscape-secondary');
        });

        $('#btnunlock').click(function() {
            screen.orientation.unlock();
        });


/*
* Splash Screen Plugin
*/

        $('#btnsplash').click(function() {
           navigator.splashscreen.show();
           window.setTimeout(function () {
               navigator.splashscreen.hide();
           }, 3000);
        });

/*
* Statusbar Plugin
*/
        if (cordova.platformId == 'android') {
            StatusBar.overlaysWebView(true);
        }

        $('#btnoverlay').click(function() {
            var isActive = $(this).hasClass('active');
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ button active state = " + isActive);

            if (isActive) {
                $(this).val('StatusBar.overlaysWebView - true');
                StatusBar.overlaysWebView(true);
            } else {
                $(this).val('StatusBar.overlaysWebView - false');
                StatusBar.overlaysWebView(false);
            }
        });

        $('#btnstyledefault').click(function() {
            StatusBar.styleDefault();
        });

        $('#btnstylelight').click(function() {
            StatusBar.styleLightContent();
        });

        $('#btnstyleblackT').click(function() {
            StatusBar.styleBlackTranslucent();
        });

        $('#btnstyleblackO').click(function() {
            StatusBar.styleBlackOpaque();
        });

        $('#btnbgcolorN').click(function() {
            StatusBar.backgroundColorByName($('#colname').val());
        });

        $('#btnbgcolorH').click(function() {
            StatusBar.backgroundColorByHexString($('#colorInput').val());
        });

        $('#btnhide').click(function() {
            StatusBar.hide();
        });

        $('#btnshow').click(function() {
            StatusBar.show();
        });

/*
* Vibration Plugin
*/

        $('#btnvib').click(function() {
            var vibdurations = $('#vibduration').val().split(',');

            navigator.vibrate(vibdurations);
        });
    });
}

var cameraprocess = function() {
    var _getPictureSuccessCallback = function(imageURI) {
        dialog.alert(
            "사진 촬영에 성공하였습니다.",  // message
            function(){
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ imageURI = " + imageURI);
                $('#cordovaimg').attr("src", imageURI);
                myModal.show();
            },         // callback
            'getPicture',            // title
            '확 인'                  // buttonName
        );

    };

    var _getPictureErrorCallback = function(message) {
        dialog.alert(
            "사진 촬영에 실패하였습니다. [" + message + "]",  // message
            function(){},         // callback
            'getPicture',            // title
            '확 인'                  // buttonName
        );
    };

    return {
        getPictureSuccessCallback   : _getPictureSuccessCallback,
        getPictureErrorCallback     : _getPictureErrorCallback
    }
}();

var fileDir = function() {
    var _getFileList = function(path){
      window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
          var reader = fileSystem.createReader();
          reader.readEntries(
            function (entries) {
                var i;
                var str = "";

                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ entries count = " + entries.length);
                for (i=0; i< entries.length; i++) {
                    console.log(entries[i].name);
                    if (entries[i].isFile) {
                        //javascript:media.play(\'' + entries[i].name + '\', \'music' + i + '\');
                        str += '<a href="#" class="list-group-item list-group-item-action" aria-current="true" id="music' + i + '">' + entries[i].name + '</a>';
                        musicList.push(entries[i].name);
                    }
                }

                $('#music').html(str);
                musicModal.show();
            },
            function (err) {
              console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Read Entry ERROR : " + JSON.stringify(err, null, 1));
            }
          );
        }, function (err) {
          console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ FileSystem ERROR : " + JSON.stringify(err, null, 1));
        }
      );
    }

    return {
        getFileList         : _getFileList
    }
}();

var dialog = function() {
    var _alert = function(message, callback, title, btntitle) {
        navigator.notification.alert(
                    message,  // message
                    callback,         // callback
                    title,            // title
                    btntitle                  // buttonName
                );
    };

    var _confirm = function(message, callback, title, btnarr) {
           navigator.notification.confirm(
                       message,  // message
                       callback,         // callback
                       title,            // title
                       btnarr                  // buttonName
                   );
       };

   var _prompt = function(message, callback, title, btnarr, defaultText) {
        navigator.notification.prompt(
            message,  // message
            callback,                  // callback to invoke
            title,            // title
            btnarr,             // buttonLabels
            defaultText                 // defaultText
        );
   };

    var _beep = function(times) {
        navigator.notification.beep(times);
    };

    return {
        alert       : _alert,
        confirm     : _confirm,
        prompt      : _prompt,
        beep        : _beep
    }
}();

var geo = function() {
    var _getCurrentPosition = function(geoSuccessCallback, geoErrorCallback, options) {
        navigator.geolocation.getCurrentPosition(geoSuccessCallback, geoErrorCallback, options);
    }

    return {
        getCurrentPosition      : _getCurrentPosition
    }
}();

var media = function() {
    var _play = function(musicname) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 1");
        currMusicIndex = musicList.indexOf(musicname);
        if (currmedia == undefined || currentMusic != musicname) {
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 2");
            if (currmedia) {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 3");
                currmedia.release();
            }

            var musicpath = "";
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ platform = " + platform);
            if (platform == 'android') {
                musicpath = cordova.file.externalDataDirectory + "Music/" + musicname;
            } else {
                musicpath = (cordova.file.documentsDirectory + "Music/" + musicname).replace('file://', '');
            }

            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ 4 : " + musicpath);
            currmedia = new Media(musicpath,
            function() {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Media Create success");
                $('#playmusic').removeClass('bi-chevron-right');
                $('#playmusic').addClass('bi-pause');

                isMediaRunning = true;
            },
            function(err) {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ ERROR : \n" + JSON.stringify(err, null, 1));
            },
            function(status) {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ STATUS : " + status);
                switch (status) {
                    case 0:
                        console.log("STATUS : Media.MEDIA_NONE");
                        break;
                    case 1:
                        console.log("STATUS : Media.MEDIA_STARTING");
                        break;
                    case 2:
                        console.log("STATUS : Media.MEDIA_RUNNING");
                        break;
                    case 3:
                        console.log("STATUS : Media.MEDIA_PAUSED");
                        break;
                    case 4:
                        console.log("STATUS : Media.MEDIA_STOPPED");
                        break;
                }
            });

            currmedia.play();
        } else {
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Plat after pause");
            $('#playmusic').removeClass('bi-chevron-right');
            $('#playmusic').addClass('bi-pause');

            isMediaRunning = true;
            currmedia.play();
        }
    }

    var _pause = function() {
        setTimeout(function () {
           currmedia.pause();
           console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ music paused");
           $('#playmusic').removeClass('bi-pause');
           $('#playmusic').addClass('bi-chevron-right');

           isMediaRunning = false;
        }, 500);
    };

    var _stop = function() {
        setTimeout(function () {
           currmedia.stop();
           currmedia.release();
           console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ music stopped");
           $('#playmusic').removeClass('bi-pause');
           $('#playmusic').addClass('bi-chevron-right');

           isMediaRunning = false;
        }, 500);
    }

    var _setVolume = function(volume) {
        if (currmedia) {
            setTimeout(function() {
                console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ volume = " + volume)
                currmedia.setVolume(volume);
            }, 200);
        }
    };

    return {
        play            : _play,
        pause           : _pause,
        stop            : _stop,
        setVolume       : _setVolume
    }
}();

var mcapture = function() {
    var _audioCapture = function(limit=3, duration=10) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ call audioCapture : limit = " + limit + ", duration = " + duration);
        navigator.device.capture.captureAudio(_aCaptureSuccess, _aCaptureError, {limit:limit, duration:duration});
    }

    // capture callback
    var _aCaptureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ audio path = " + path);
            // do something interesting with the file
        }
    };

    // capture error callback
    var _aCaptureError = function(error) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Audio Capture error = " + JSON.stringify(error, null, 1));
        dialog.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    var _imgCapture = function(limit=3) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ call imgCapture : limit = " + limit);
        navigator.device.capture.captureImage(_iCaptureSuccess, _iCaptureError, {limit:limit});
    };

    // capture callback
    var _iCaptureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ iamge path = " + path);
            // do something interesting with the file
        }
    };

    // capture error callback
    var _iCaptureError = function(error) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Image Capture error = " + JSON.stringify(error, null, 1));
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    var _videoCapture = function(limit=1, duration=10) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ call videoCapture : limit = " + limit + ", duration = " + duration);
        navigator.device.capture.captureVideo(_vCaptureSuccess, _vCaptureError, {limit:limit, duration:duration});
    };

    // capture callback
    var _vCaptureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ video path = " + path);
            // do something interesting with the file
        }
    };

    // capture error callback
    var _vCaptureError = function(error) {
        console.log("⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐ Video Capture error = " + JSON.stringify(error, null, 1));
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    return {
        audioCapture        : _audioCapture,
        imgCapture          : _imgCapture,
        videoCapture        : _videoCapture
    }
}();

function alertDismissed() {
    alert("navigator.notification.alert 콜백 호출!");
}
