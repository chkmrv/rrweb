$(function () {
    //$('#no_see, #to_main_version').off('click');
    $('a.disabled').on('click', function (e) {
        e.preventDefault();
    });
    $('.filter .dash_link').click(function (e) {
        e.preventDefault();
        $('.dash_link').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('data-type') == 'video') {
            $('.folder').hide();
            $('.folder.video').show();
        } else if ($(this).attr('data-type') == 'photo') {
            $('.folder.video').hide();
            $('.folder.photo').show();
        } else {
            $('.folder').show();
        }

    });

    $('.folder').click(function () {
        $.ajax({
            url: "/site/press/multimedia/?clear_cache=Y&pagenav_ajax_call=Y&id=" + $(this).attr('data-id'),
        }).done(function (data) {
            console.log(data);
            $('.preview_list.js-tabs').html(data);
        });
    });
    /*$(".lightbox").fancybox({
     helpers:  {
     title:  null
     }
     });*/
});

function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
        function () {
            currentHeight = $(this).height();
            if (currentHeight > tallestcolumn) {
                tallestcolumn = currentHeight;
            }
        }
    );
    columns.height(tallestcolumn);
}
$(document).ready(function () {
    setEqualHeight($(".masonry_list div.news_box"));

    $('videoloader').each(function () {
        var curElem = $(this); // Супер хак
        var videoLink = $(this).attr('link');
        var videoWidth = $(this).attr('width');
        var videoHeight = $(this).attr('height');
        var videoAutoplay = $(this).attr('data-autoplay');
        jQuery.ajax({
            url: "/site/getVideoCode.php",
            type: "POST",
            data: ({
                videoLink: videoLink,
                videoWidth: videoWidth,
                videoHeight: videoHeight,
                videoAutoplay: videoAutoplay
            }
            ),
            timeout: 3000,
            beforeSend: function () {
            },
            success: function (data) {
                curElem[0].outerHTML = data;
                var scriptLoader = data.split('<script>');
                scriptLoader = scriptLoader[1].split('</script>');
                eval(scriptLoader[0]);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    });
});


/* REGION TABS */
(function ($) {
    jQuery.fn.lightTabs = function (options) {
        var createTabs = function () {
            tabs = this;
            i = 0;
            showPage = function (i) {
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }
            showPage(0);
            $(tabs).children("ul").children("li").each(function (index, element) {
                $(element).attr("data-page", i);
                i++;
            });
            $(tabs).children("ul").children("li").click(function () {
                showPage(parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

$(document).ready(function () {
    var $tabs = $(".tabs");
    if($tabs.length){
        $(".tabs").lightTabs();
    }
});

function mixinKladrResultResults(searchName, data){
    if(!searchName) return data;

    searchName = _.lowerCase(searchName);

    var arAdditionalSearch = [
        {
            name: 'Северо-Кавказский',
            type: 'федеральный округ',
            typeShort: 'ФО',
            redionId: "96"
        }
    ];

    /*
    $(data.result).each(function(i){
        
        console.log(data.result[i]);
        if(data.result[i].name == 'Крым'){
            data.result[i].name = 'Крымский федеральный округ';
            data.result[i].type = '';
            data.result[i].typeShort = ''
        }
        
    });
    */
    

    $(arAdditionalSearch).each(function(i, addRegion){

        if(-1 !== _.lowerCase(addRegion.name).indexOf(searchName)){
            data.result.push({
                contentType: "region",
                id: addRegion.redionId,
                name: addRegion.name,
                okato: '',
                type: addRegion.type,
                typeShort: addRegion.typeShort,
                zip: false
            });
        }

    });

    return data;
}