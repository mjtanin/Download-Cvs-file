

//Bulk Domain Authority Checker



var linksArr = new Array();

var nlinksArr = new Array();

var downloadData, authCode, myUrl;

//var domainAuthority = "<?php echo $domainAuth; ?>";
//var pageAuthority = "<?php echo $pageAuth; ?>";
//var spamScore = "<?php echo $spamAuth; ?>";
//var mozRank = "<?php echo $mozRank; ?>";

function startTask(auth){

    authCode = auth;

    jQuery("#mainbox").fadeOut();

    jQuery("#resultBox").css({"display":"block"});

    jQuery("#resultBox").show();

    jQuery("#resultBox").fadeIn();

    jQuery(".percentimg").css({"display":"block"});

    jQuery(".percentimg").show();

    jQuery(".percentimg").fadeIn();

    

    var nLoop = 0;  

    var listHTML = '<br><table id="resTable" class="table table-bordered" style="word-wrap:break-word;"><thead><tr><th>#</th><th>'+msgTab1+'</th><th>'+msgTab2+'</th><th>'+msgTab3+'</th><th>'+msgTab4+'</th><th>'+msgTab5+'</th></tr></thead><tbody>';

    for(i=0; i < linksArr.length; i++){

       myURL=jQuery.trim(linksArr[i]);

   	   if (myURL.indexOf("https://") == 0){myURL=myURL.substring(8);}

       if (myURL.indexOf("http://") == 0){myURL=myURL.substring(7);}

       if(myURL != ""){

        nlinksArr[nLoop] = myURL;

        var classTr = nLoop % 5 == 0?'even':'odd';

        listHTML+= '<tr class="'+classTr+'"><td align="center">'+(nLoop+1)+'</td><td id="link-'+nLoop+'"><a href="'+ "http://" + myURL +'" target="_blank">'+ myURL +'</a></td><td align="center" id="status-'+nLoop+'">&nbsp;</td><td align="center" id="status1-'+nLoop+'">&nbsp;</td><td align="center" id="status2-'+nLoop+'">&nbsp;</td><td align="center" id="status3-'+nLoop+'">&nbsp;</td></tr>';

        if(nLoop===19){

        break;

        }

        nLoop = nLoop +1;

       }

    }

    listHTML+= '</tbody></table>';

    jQuery("#results").html(listHTML);

    jQuery("#results").slideDown();

    setTimeout(function(){

    var pos = $('#results').offset();

    $('body,html').animate({ scrollTop: pos.top });

    }, 1500);

    make(0,myURL);

}



function make(domainID,sqURL) { 

	if(domainID >= nlinksArr.length){

		jQuery(".percentimg").fadeOut();

		return;

	}

    var c_link = nlinksArr[domainID];

    //AJAX Call

	jQuery.post(axPath,{mozAuthority:'1', domainAuthority:'1', sitelink:c_link, authcode:authCode},function(data){

		if(data == '0'){

			jQuery("#status-"+domainID).html('<b style="color:red">'+msgTab6+'</b>');

            downloadData = downloadData + c_link + "," + data + "\r\n";

		} else {
            const allData = data.split("-");
            //console.log(Math.round(5.95), Math.round(5.5), Math.round(5.05));
          // expected output: 6 6 5
			jQuery("#status-"+domainID).html('<b style="color:#008000">'+allData[0]+'</b>');
			
			jQuery("#status1-"+domainID).html('<b style="color:#8d058f">'+allData[1]+'</b>');
			
			jQuery("#status2-"+domainID).html('<b style="color:#b50223">'+parseInt(Number(allData[2]) * 100)/100+ '%'+'</b>');  
// 			jQuery("#status2-"+domainID).html('<b style="color:#b50223">'+allData[3]+'</b>');  
		
			jQuery("#status3-"+domainID).html('<b style="color:#040be7">'+allData[3]+'</b>');

            downloadData = downloadData + c_link + "," +allData[0]+ "," +allData[1]+ "," +parseInt(Number(allData[2]) * 100)/100+ '%'+ "," +allData[3]+ "\r\n";
            

		}

		window.setTimeout("make("+(domainID+1)+",'"+sqURL+"')", 6000);

	});

}

function saveAsFile(str) {      

    var textToWrite = str;

    var textFileAsBlob = new Blob([textToWrite], {type:'text/csv'});

    var downloadLink = document.createElement("a");

    downloadLink.download = 'domain_authority.csv';

    downloadLink.innerHTML = "My Link";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    downloadLink.onclick = destroyClickedElement;

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();

}



function destroyClickedElement(event){

    document.body.removeChild(event.target);

}



jQuery(document).ready(function(){

    

    jQuery("#exportButton").click(function() {

        saveAsFile(downloadData);    

    });

    

    jQuery("#checkButton").click(function(){

        downloadData =  "Bulk Domain Authority URLs Report - https://free-seo-tools.org/domain-authority-checker"+ "\r\n\r\n";

        downloadData = downloadData + msgTab1 + "," + msgTab2 +"," + msgTab3 +"," + msgTab4 +"," + msgTab5+ "\r\n";

        var myURLs=jQuery("#linksBox").val();

        

        if(myURLs == ''){

    	    sweetAlert(oopsStr, msgDomain , "error");

    		return false;

        }

        linksArr = myURLs.split('\n');

        validateCaptcha();

    });

});



/*

 * @author Balaji

 * @name: AtoZ SEO Tools v2 - PHP Script

 * @copyright © 2017 ProThemes.Biz

 *

 */
