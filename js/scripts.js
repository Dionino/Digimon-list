var digimonList = (function () {
	var repository = [];

	var apiUrl = 'https://digimon-api.herokuapp.com/api/digimon';

	function showDetails(item) {
		digimonList.loadDetails(item).then(function (digimon) {
			showModal(digimon);
		})
	}

	function addListItem(digimon) {
		var $listItem = $('.Digilist');
		var $button = $('<li><button type="button" class="digimon_button" data-toggle="modal" data-target="#exampleModalCenter"> ' + digimon.name + '</button></li>');
		$listItem.append($button);
		$('body').append($listItem);
		$button.on('click', function () {
			showDetails(digimon);
		})
	}

	function getAll() {
		return repository;
	}

	function add(item) {
		repository.push(item);
	}

	async function loadList() {
		return await $.ajax({ url: apiUrl, dataType: 'json'}).then(function (item) {
			$.each(item, function(i, item) {
				add(item);
			});
		}).catch(function(e) {
			console.error(e);
		})
	}

	async function loadDetails(item) {
		var url = 'https://digimon-api.herokuapp.com/api/digimon';
		return await $.ajax(url).then(function () {
			$.each(item, function(i, item) {
				add(item);
			});
			return item;
		}).catch(function (e) {
			console.error(e);
		})
	}

	function showModal(digimon) {
		var $modalTitle = $('modal-title');
		var $modal = $('modal-body');
		var $nameElement = digimon.name;
		$('h5.modal-title').html($nameElement);
		var $imageElement = $('<img src="https://digimon.shadowsmith.com/img/'+digimon.name.toLowerCase()+'.jpg"></img>');
		$('div.digimon-img').html($imageElement);
		var $detailsElement = $('<p> ID: ' + digimon.id + ', Level: ' + digimon.level + ' </p>');
		$('p.digimon-details').html($detailsElement);
		$modalTitle.append('$nameElement');
		$modal.append('$imageElement');
		$modal.append('$detailsElement');

	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
    showModal: showModal
	};

})(); // IIFE ends here

var $Digilist = $('Digilist');

digimonList.loadList().then(function() {
	var $digimon = digimonList.getAll();
	$.each($digimon, function(i, digimon) {
		digimonList.addListItem(digimon);
	});
});
