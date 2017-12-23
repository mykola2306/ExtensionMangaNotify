//chrome.alarms.create("5min", { 
//    periodInMinutes: 0.25
//});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "5min") {
        var time = Date();
        console.log(time);
        if (localStorage.lastUpdated) {
//            console.log("TDG exists");
        } else {
            localStorage.lastUpdated = "";
        }
        localStorage.lastUpdated = time;
        //        console.log('+++');
        //        console.log(abcd);
        //        logToCon();
        //        console.log(window.document)
        //        console.log($("body"));

        $("body").append('<div id="container"> <div class="gif TDG"> <div class="containerGif"> <img class="loader" src="giphy.gif"> <h2>Loading!</h2> </div></div><img class="logo" src="TDG.png"> <h1>=TDG=<i class="TDG fa fa-pencil-square-o" aria-hidden="true"></i></h1> <input class="addToListTDG" type="text" placeholder="+ Add new To Do"> <ul class="TDGchapterList"></ul> </div><div id="container"> <div class="gif OP"> <div class="containerGif"> <img class="loader" src="giphy.gif"> <h2>Loading!</h2> </div></div><img class="logo" src="OnePieceLogo.png"> <h1>=One Piece=<i class="OP fa fa-pencil-square-o" aria-hidden="true"></i></h1> <input class="addToListOP" type="text" placeholder="+ Add new To Do"> <ul class="OPchapterList"></ul> </div><div id="container"> <div class="gif OPM"> <div class="containerGif"> <img class="loader" src="giphy.gif"> <h2>Loading!</h2> </div></div><img class="logo" src="OPM22.png"> <h1>=One Punch Man=<i class="OPM fa fa-pencil-square-o" aria-hidden="true"></i></h1> <input class="addToListOPM" type="text" placeholder="+ Add new To Do"> <ul class="OPMchapterList"></ul> </div><div id="container"> <div class="gif AOT"> <div class="containerGif"> <img class="loader" src="giphy.gif"> <h2>Loading!</h2> </div></div><img class="logo" src="AOT1.png"> <h1>=Attack on Titan=<i class="AOT fa fa-pencil-square-o" aria-hidden="true"></i></h1> <input class="addToListAOT" type="text" placeholder="+ Add new To Do"> <ul class="AOTchapterList"></ul> </div><button class="refresh">Refresh</button> <button id="alarmOff" class="reset">RESET</button> <div class="setup"> <div class="setupContent"> <h1>One time setup</h1> <h2>Hi,<br>i hope you enjoy this extension</h2> <p class="p">Latest chapter will be added for each Manga</p><div class="descrption"> <div class="clearfix"> <img src="iconDel.bmp"> <p class="itemDescription">Use this button to delete a chapter you have alread finished reading</p></div><hr> <div class="clearfix"> <img src="iconOpen.bmp"> <p class="itemDescription">Use this button to open the selected chapter in a new tab</p></div><hr> <div class="clearfix"> <img src="iconClick1.png"> <p class="itemDescription">Clicking on the selected chapter crosses it out, marking it is read</p></div><hr> <div class="clearfix"> <img src="iconLogo.png"> <p class="itemDescription">By clicking on the extension icon in the browser, the extension checks for new chapters. The extension also checks automatically every hour if there are new chapters</p></div><hr> <div class="clearfix"> <img src="iconUnread.png"> <p class="itemDescription">A number is displayed beside the extension icon indicating number of unread manga chapters</p></div><hr> <div class="clearfix"> <img src="iconRefresh.bmp"> <p class="itemDescription">Click this button to manully check if there are any new manga Chapters</p></div><hr> <div class="clearfix"> <img src="iconReset.bmp"> <p class="itemDescription">Clicking this button will delete all user data and reset the extension</p></div></div></div><button id="alarmOn" class="confirm">CONFIRM</button> </div>');

        if (localStorage.numberOfUnread) {

        } else {
            localStorage.numberOfUnread = 0;
        }
        if (!Number(localStorage.oneTimeConfirm) == 1) {
            oneTimeSetup();
        }
        
        $('.TDG').removeClass("dispNone");
        if (localStorage.TDG) {
            console.log("TDG exists");
        } else {
            console.log("creating 'TDG'");
            localStorage.TDG = "-";
        }
        var listOfTDGChap = document.querySelector('.TDGchapterList');
        var storedValuesTDG = window.localStorage.localTDG;
        if (!storedValuesTDG) {
            listOfTDGChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
            storeTDG();
        } else {
            listOfTDGChap.innerHTML = storedValuesTDG;
        }

        function storeTDG() {
            window.localStorage.localTDG = listOfTDGChap.innerHTML;
        }
        $.ajax({
            url: "http://hatigarmscans.eu/hs/series/tales-of-demons-and-gods/",
            success: function (pageCode) {
                console.log("TDG CHECK CHAPTER CALLED");
                var newChapterTDG = "";
                var linkTDG = pageCode;
                linkTDG = linkTDG.match('title"><a href="(.*)\" ');
                newChapterTDG = pageCode.match("Vol.1 (.*)\">");
                //                console.log("print new Manga - " + newChapterTDG[1]);
                if (localStorage.TDG == newChapterTDG[1]) {
                    console.log("No new Manga");
                    if ($('.TDGchapterList li').first().text() == "No new Manga" && !$('.TDGchapterList').length == 1) {
                        console.log("++++++++++++++++");
                        $('.TDGchapterList li').first().remove();
                    }
                    $('.TDGchapterList li').first().addClass("fade")
                    storeTDG();
                } else {
                    notification("New TGD chapter", newChapterTDG[1], 'TDGcover.jpg');
                    console.log("New Manga!!!");
                    localStorage.setItem("TDG", newChapterTDG[1]);
                    numUnreadAdd();
                    if ($('.TDGchapterList li').first().text() == "No new Manga") {
                        console.log("++++++++++++++++");
                        $('.TDGchapterList li').first().remove();
                    }
                    $(".TDGchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterTDG[1] + "<a href='" + linkTDG[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");
                    
                    storeTDG();
                }
                $('.TDGchapterList li').first().removeClass("fade")
                $('.TDG').addClass("dispNone");
            }
        });

        //============================================================================================
        //============================================================================================

        $('.TDG').removeClass("dispNone");
        if (localStorage.OP) {
            console.log("OP exists");
        } else {
            console.log("creating 'OP'");
            localStorage.OP = "-";
        }


        var listOfOpChap = document.querySelector('.OPchapterList');
        var storedValuesOP = window.localStorage.localOP;
        if (!storedValuesOP) {
            listOfOpChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
            storeOP();
        } else {
            listOfOpChap.innerHTML = storedValuesOP;
        }
        $(".OPchapterList").on("click", "li", function () {
            $(this).toggleClass("completed");
            if ($(this).text() !== "No new Manga") {
                if ($(this).hasClass("completed")) {
                    numUnreadSub();
                } else {
                    numUnreadAdd();
                }
            }

            storeOP();
        });

        function storeOP() {
            window.localStorage.localOP = listOfOpChap.innerHTML;
        }


        // ONE PIECE
        $.ajax({
            url: "https://jaiminisbox.com/reader/series/one-piece-2",
            success: function (pageCode) {
                console.log("OP CHECK CHAPTER CALLED");
                var newChapterOP = "";
                newChapterOP = pageCode.match('div class="title"><a (.*)/a></div>');
                var linkOP = newChapterOP[1];
                linkOP = linkOP.match('\"(.*)\" ');
                newChapterOP = newChapterOP[1].match('\">(.*)<');
                //                console.log("new chapter - " + newChapterOP[1]);
                //                console.log("link - " + linkOP[1]);
                //                console.log("print new Manga - " + newChapterOP[1]);
                if (localStorage.OP == newChapterOP[1]) {
                    console.log("No new Manga");
                    if ($('.OPchapterList li').first().text() == "No new Manga" && !$('.OPchapterList').length == 1) {
                        console.log("++++++++++++++++");
                        $('.OPchapterList li').first().remove();
                    }
                    $('.OPchapterList li').first().addClass("fade")
                    storeOP();

                } else {
                    notification("New One Piece chapter", newChapterOP[1], 'OnePieceLogo.png');
                    console.log("New Manga!!!");
                    localStorage.setItem("OP", newChapterOP[1]);
                    numUnreadAdd();

                    if ($('.OPchapterList li').first().text() == "No new Manga") {
                        console.log("++++++++++++++++");
                        $('.OPchapterList li').first().remove();
                    }
                    //            $(".OPchapterList").append("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + text + "<a href='https://jaiminisbox.com/reader/series/one-piece-2'><span class='open'><i class='fa fa-share'></i></span></a></li>");
                    $(".OPchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterOP[1] + "<a href='" + linkOP[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

                    storeOP();
                }
                $('.OPchapterList li').first().removeClass("fade")
                $('.OP').addClass("dispNone");
                //            console.log("/////////////");
                //            console.log($('.OPchapterList li').removeClass("fade"));
                //            console.log("/////////////");

            }
        });


        //============================================================================================
        //============================================================================================

        $('.TDG').removeClass("dispNone");
        if (localStorage.OPM) {
            console.log("OPM exists");
        } else {
            console.log("creating 'OPM'");
            localStorage.OPM = "-";
        }

        var listOfOPMChap = document.querySelector('.OPMchapterList');
        var storedValuesOPM = window.localStorage.localOPM;
        if (!storedValuesOPM) {
            listOfOPMChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
            storeOPM();
        } else {
            listOfOPMChap.innerHTML = storedValuesOPM;
        }

        function storeOPM() {
            window.localStorage.localOPM = listOfOPMChap.innerHTML;
        }


        // ONE PUNCH MAN
        $.ajax({
            url: "https://readms.net/manga/onepunch_man",
            success: function (pageCode) {
                console.log("OPM CHECK CHAPTER CALLED");
                var newChapterOPM = "";
                newChapterOPM = pageCode.match('<td>(.*)</td>');
                var linkOPM = newChapterOPM[1];
                linkOPM = linkOPM.match('href="(.*)\">');
                linkOPM[1] = "https://readms.net" + linkOPM[1];
                newChapterOPM = newChapterOPM[1].match('\">(.*)<');
                //                console.log("new chapter - " + newChapterOPM[1]);
                //                console.log("link - " + linkOPM[1]);
                if (localStorage.OPM == newChapterOPM[1]) {
                    console.log("No new Manga");
                    if ($('.OPMchapterList li').first().text() == "No new Manga" && !$('.OPMchapterList').length == 1) {
                        console.log("++++++++++++++++");
                        $('.OPMchapterList li').first().remove();
                    }
                    $('.OPMchapterList li').first().addClass("fade")
                    storeOPM();

                } else {
                    notification("New One Punch Man chapter", newChapterOPM[1], 'OPMcover.png');
                    console.log("New Manga!!!");
                    localStorage.setItem("OPM", newChapterOPM[1]);
                    numUnreadAdd();

                    if ($('.OPMchapterList li').first().text() == "No new Manga") {
                        console.log("++++++++++++++++");
                        $('.OPMchapterList li').first().remove();
                    }
                    $(".OPMchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterOPM[1] + "<a href='" + linkOPM[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

                    storeOPM();
                }
                $('.OPMchapterList li').first().removeClass("fade")
                $('.OPM').addClass("dispNone");
                //                console.log($('.OPMchapterList li').removeClass("fade"));
            }
        });

        //=========================================================================
        //                          ATTACK ON TITAN
        //=========================================================================

        $('.TDG').removeClass("dispNone");
        if (localStorage.AOT) {
            console.log("AOT exists");
        } else {
            console.log("creating 'AOT'");
            localStorage.AOT = "-";
        }

        var listOfAOTChap = document.querySelector('.AOTchapterList');
        var storedValuesAOT = window.localStorage.localAOT;
        if (!storedValuesAOT) {
            listOfAOTChap.innerHTML = "<li><span><i class='fa fa-trash'></i></span>" + "No new Manga" + "</li>";
            storeAOT();
        } else {
            listOfAOTChap.innerHTML = storedValuesAOT;
        }

        function storeAOT() {
            window.localStorage.localAOT = listOfAOTChap.innerHTML;
        }
        // 					ATTACK ON TITAN
        $.ajax({
            url: "https://readms.net/manga/attack_on_titan",
            success: function (pageCode) {
                console.log("AOT CHECK CHAPTER CALLED");
                var newChapterAOT = "";
                newChapterAOT = pageCode.match('<td>(.*)</td>');
                var linkAOT = newChapterAOT[1];
                linkAOT = linkAOT.match('href="(.*)\">');
                linkAOT[1] = "https://readms.net" + linkAOT[1];
                newChapterAOT = newChapterAOT[1].match('\">(.*)<');
                //                console.log("new chapter - " + newChapterAOT[1]);
                //                console.log("link - " + linkAOT[1]);
                if (localStorage.AOT == newChapterAOT[1]) {
                    console.log("No new Manga");
                    if ($('.AOTchapterList li').first().text() == "No new Manga" && !$('.AOTchapterList').length == 1) {
                        console.log("++++++++++++++++");
                        $('.AOTchapterList li').first().remove();
                    }
                    $('.AOTchapterList li').first().addClass("fade")
                    storeAOT();

                } else {
                    notification("New Attack on Titan chapter", newChapterAOT[1], 'AOTcover.png');
                    console.log("New Manga!!!");
                    localStorage.setItem("AOT", newChapterAOT[1]);
                    numUnreadAdd();

                    if ($('.AOTchapterList li').first().text() == "No new Manga") {
                        console.log("++++++++++++++++");
                        $('.AOTchapterList li').first().remove();
                    }
                    $(".AOTchapterList").prepend("<li><span class='rev'><i class='fa fa-trash'></i> </span>" + newChapterAOT[1] + "<a href='" + linkAOT[1] + "'><span class='open'><i class='fa fa-share'></i></a></li>");

                    storeAOT();
                }
                $('.AOTchapterList li').first().removeClass("fade")
                $('.AOT').addClass("dispNone");
            }
        });




    }
});
