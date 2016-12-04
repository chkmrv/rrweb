<%
/**
 * Copyright (c) 2000-2013 Liferay, Inc. All rights reserved.
 */
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ page session="false" %>
<portlet:defineObjects />
	
    <script type="text/javascript" src="/htdocs/js/2012/jquery-1.7.1.min.js"></script> 
    <link rel="stylesheet" type="text/css" href="/htdocs/css/2012/jquery.ui.css" />
    <link rel="stylesheet" href="/htdocs/css/2012/blocks/sf_styles.css"/>
    <link rel="stylesheet" href="/htdocs/css/preview.css" />
    <link rel="stylesheet" href="/htdocs/css/filelist.css" />
    <!-- <link rel="stylesheet" href="/htdocs/css/_signPopup.css" /> -->

    <script type="text/javascript">
    $(function(){
        // chunks decl
        var mnemonic = "f155dd4f-01cb-4736-9d92-430660156b9b";
        
        //Customization for pismo-rukovoditelyu
        if (window.location.pathname.indexOf('pismo-rukovoditelyu') != -1) {
        	mnemonic = '123e8ea4-2b9c-4ac9-824c-1a4df1e5085f';
		}
        //Customization for podacha-zalob
        if (window.location.pathname.indexOf('podacha-zalob') != -1) {
            mnemonic = '17babb88-1b20-4b42-8d2d-91b40f6e2f65';
        }
        //Customization for podacha-zalob
        if (window.location.pathname.indexOf('obrasenia-grazdan') != -1) {
            mnemonic = 'ca6f9715-c473-41b8-906b-de52264e4035';
        }
        var mnemonicUrl = window.location.search.slice(1);
        
        if (mnemonicUrl.length <= 36 && mnemonicUrl.length !== 0) {
            mnemonic = mnemonicUrl;
        }

        Chunk.decl("content", "service",
            // init
            function(params, data){
                $(function(){
                    globalPrepare(params, data);
                });                    

            },
            // static data
            {"orderId":null,"mnemonic": mnemonic,"serviceTargetExtId": mnemonic},
            // is tmpl
            false
        );

        Chunk.decl("block", "shadow",
            // init
            function(params, data){
                var $me = $(this);
                var counter = 0;

                $me.bind('shade', function() {
                    if (++counter == 1) {
                        $me.height($(document).height());
                        $me.show();
                    }
                    return false;
                });

                $me.bind('unshade', function(e) {
                    counter && --counter;
                    if (counter == 0){
                        $me.hide();
                    }
                    return false;
                });
            },
            // static data
            {},
            // is tmpl
            false
        );

        // save chunk struct for delayed init
        Chunk.pageStruct = [{"contains":[],"name":"service","index":1,"type":"content","params":{}},{"contains":[],"name":"shadow","index":2,"type":"block","params":{}}];
        });

        </script>        

        <script type="text/javascript">
     // page chunks init
        // (this must be run after resources been loaded, because chunks can have depends from by-resources-defined data)
        $(function(){
            Chunk.domReady(Chunk.pageStruct);
        });

        </script>

        <script type="text/javascript" src="/htdocs/js/2012/jquery.tmpl.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/json2.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/fw/framechunk.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/epgu.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/jquery.validate.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/jquery.validate.patch.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/validateFunctions.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/fw/form.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/plupload/plupload.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/plupload/plupload.flash.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/plupload/plupload.html4.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/plupload/plupload.html5.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/stash/stash.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/htdocs/css/2012/style.css" />
        
        
           

<div class="page">
    <div style="display:none" class="block-templates-here">


    </div>

	    
<span style="display:none" for="block/shadow" id="chunk2_start"></span>
<div id="shadowWrap">
    <div id="shadowglass-clock"></div>
</div>

<span style="display:none" for="block/shadow" id="chunk2_end" /></span>


                    
<span style="display:none" for="content/service" id="chunk1_start"></span>
<!-- CSS Goes First! -->

<div id="content">
    <div class="pf-form"></div>
</div>



<span style="display:none" for="content/service" id="chunk1_end" /></span>

               
        <div class="pusher"></div>


    <script type="text/javascript" src="/htdocs/common/js/lib/underscore.js"></script>  
    <script type="text/javascript" src="/htdocs/common/js/lib/lodash.custom.js"></script>
        <!-- Environment Options -->
        <script type="text/javascript">
            var ENV = {
                context_uri: '/',
                url: '/',
                returnUrl: '/',
                userSelectedRegion: {
                    "name": "Российская Федерация",
                    "code": "00000000000"
                },
                totalOrderFileSize:-1
            };
        </script>

        <script type="text/javascript" src="/htdocs/js/2012/lib/form.prepare.js"></script>

        <!-- Libs -->
        <script type="text/javascript" src="/htdocs/common/js/lib/backbone.min.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.class.min.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.pgu.form.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.tmpl.min.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.validate.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.url.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.mask.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/plupload/plupload.full.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/uuid.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.imgareaselect.min.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/spin.min.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/jquery.scrollTo.min.js">
        </script>
        <script type="text/javascript" src="/htdocs/common/js/lib/cadesplugin_api.js"></script>
        <!-- Templates -->
        <script type="text/javascript" src="/htdocs/common/js/src/templates.js"></script>
        <!-- SRC -->
        <script type="text/javascript" src="/htdocs/common/js/src/gateway.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/src/validators.js"></script>
        
        <script type="text/javascript" src="/htdocs/common/js/src/signature.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/src/popup.js"></script>
        <!-- PGU.base Classes -->
        <script type="text/javascript" src="/htdocs/common/js/base/Events.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/Attributes.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/Repeater.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/SubmitEvent.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/SubmitEvents.js"></script>
       <script type="text/javascript" src="/htdocs/common/js/base/Rule.js"></script> 
        <script type="text/javascript" src="/htdocs/common/js/base/Rule.syntax.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/Rules.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/Dictionary.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/handlers.publisher.js"></script>
        <!-- PGU.form Classes -->
        <script type="text/javascript" src="/htdocs/common/js/form/Control.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Field.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Container.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Form.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FormStep.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FormButton.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/BasePanel.js" ></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Panel.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/NavPanel.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldText.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldTextArea.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldTextDate.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldRadio.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldCheckbox.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldUpload.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldUploadPC.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldUploadDictionary.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldDropdown.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldDropdownHierarchic.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldDropdownHierarchicMultiple.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldDropdownMultiple.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldSuggest.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldYear.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldMonth.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldMonthExt.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/DataGrid.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/TimeSlot.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Table.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Button.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Label.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/KladrWidget.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Kladr.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/ImageEditor.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/KladrWidgetAddressRKN.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/KladrAddressRKN.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/KladrWidgetJuridicalPersonRKN.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/KladrJuridicalPersonRKN.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/KladrWidgetNaturalPersonRKN.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/KladrNaturalPersonRKN.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/LocationBasedOnKladr.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/LocationBasedOnKladrWidget.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/TableFms.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FormTable.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/THead.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/TBody.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/THRow.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/TRow.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/TCell.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/THCell.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/ButtonSelectRow.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/DictionaryEditor.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldMap.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/FieldMapWithList.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/TimeSlotExt.js"></script>

        <script type="text/javascript" src="/htdocs/common/js/form/FiasWidget.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/Fias.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/form/AutomotiveAxles.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/lib/spin.min.js"></script>
        <!-- Form.Player -->

        <script type="text/javascript" src="/htdocs/common/js/base/base.engine.js"></script>
        <script type="text/javascript" src="/htdocs/common/js/base/engine.player.js"></script>
        <script type="text/javascript" src="/htdocs/js/2012/lib/form.player.js"></script>
        <script type="text/javascript">
            // hack to prevent region_indicator init
            // todo: remove block/region_indicator from template, and delete this code
            var reg = $('.region_indicator');
            reg.add(reg.prev()).add(reg.next()).remove();
        </script>
        
</div>


