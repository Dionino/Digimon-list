var digimonList = (function () {
  var repository = [];

  var apiUrl = 'https://digimon-api.herokuapp.com/api/digimon';

  function showDetails(item) {
    digimonList.loadDetails(item).then(function (digimon) {
      showModal(digimon);
    })
  };

  function addListItem(digimon) {
    var $listItem = $('.Digilist');
    $listItem.append('<li><button class="digimon_button" ' + ' id=' + digimon.name + '>' + digimon.name + '</button></li>');
    $('body').append($listItem);
    $('button#'+digimon.name).on('click', function (event) {
      showDetails(digimon);
    })
  };

  function getAll() {
    return repository;
  }

  function add(item) {
    repository.push(item);
  }

  function loadList() {
    return $.ajax({ url: apiUrl, dataType: 'json'}).then(function (item) {
      $.each(item, function(i, item) {
        add(item);
      });
    }).catch(function(e) {
      console.error(e);
    })
  };

  function loadDetails(item) {
    var url = 'https://digimon-api.herokuapp.com/api/digimon';
    return $.ajax(url).then(function (details) {
      $.each(item, function(i, item) {
        add(item);
      });
      return item;
    }).catch(function (e) {
      console.error(e);
    });
  };

  function showModal(digimon) {
    var $modalDigimon = $('#modal-digimon').html('');
    var $modal = $('<div class="modal"></div>');
    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    $closeButtonElement.on('click', hideModal);
    var $nameElement = $('<h1>' + digimon.name + ' </h1>');
    var $imageElement = $('<img src="https://digimon.shadowsmith.com/img/'+digimon.name.toLowerCase()+'.jpg"></img>');
    var $detailsElement = $('<p> ID: ' + digimon.id + ', Level: ' + digimon.level + ' </p>');

    $modal.append($closeButtonElement);
    $modal.append($nameElement);
    $modal.append($imageElement);
    $modal.append($detailsElement);
    $('#modal-digimon').append($modal);

    $('#modal-digimon').addClass('is-visible');
  };

  function hideModal() {
    var $modalDigimon = $('#modal-digimon');
    $('#modal-digimon').removeClass('is-visible');
  };

  $(window).on('keydown', (e) => {
    var $modalDigimon = $('#modal-digimon');
    if (e.key === 'Escape' && $('#modal-digimon').hasClass('is-visible')) {
      hideModal();
    }
  });

  var $modalDigimon = $('#modal-digimon');
  $('#modal-digimon').on('click', (e) => {
    var target = e.target;
    if (target === $modalDigimon) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

})(); // IIFE ends here

var $Digilist = $('Digilist');

digimonList.loadList().then(function() {
  var $digimon = digimonList.getAll();
  $.each($digimon, function(i, digimon) {
    digimonList.addListItem(digimon);
  });
});
