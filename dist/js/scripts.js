var digimonList=function(){var i=[],n="https://digimon-api.herokuapp.com/api/digimon";function t(i){digimonList.loadDetails(i).then(function(i){!function(i){var n=$(".modal-header");$("<h5>"+i.name+" </h5>");n.append("$nameElement");var t=$("modal-body"),a=$('<img src="https://digimon.shadowsmith.com/img/'+i.name.toLowerCase()+'.jpg"></img>');$("div.digimon-img").html(a);$("<p> ID: "+i.id+", Level: "+i.level+" </p>");t.append("$imageElement"),t.append("$detailsElement")}(i)})}function a(n){i.push(n)}return{add:a,getAll:function(){return i},addListItem:function(i){var n=$(".Digilist"),a=$('<li><button type="button" class="digimon_button" data-toggle="modal" data-target="#exampleModalCenter"> '+i.name+"</button></li>");n.append(a),$("body").append(n),n.click(function(){t(i)})},loadList:async function(){return await $.ajax({url:n,dataType:"json"}).then(function(i){$.each(i,function(i,n){a(n)})}).catch(function(i){console.error(i)})},loadDetails:async function(i){return await $.ajax("https://digimon-api.herokuapp.com/api/digimon").then(function(){return $.each(i,function(i,n){a(n)}),i}).catch(function(i){console.error(i)})}}}(),$Digilist=$("Digilist");digimonList.loadList().then(function(){var i=digimonList.getAll();$.each(i,function(i,n){digimonList.addListItem(n)})});
