var carroModulo = angular.module('carroApp', ['ngAnimate']);

carroModulo.controller('carroController', function ($scope,$http) {
	
	var urlBase = "";
	$scope.toggle = true;
	$scope.selection = [];
	$scope.statuses = ['NAO VENDIDO','VENDIDO'];
	$scope.priorities = ['NOVO','SEMI NOVO'];
	$http.defaults.headers.post["Content-Type"] = "application/json";

    function listarTodosCarros() {
    	$http.get(urlBase + '/carroes/search/findByVendido?vendido=0').success(function (data) {
    		if (data._embedded != undefined) {
    			$scope.carros = data._embedded.carroes;
    		} else {
    			$scope.carros = [];
    		}
    		for (var i = 0; i < $scope.carros.length; i++) {
    			if ($scope.carros[i].status == 'VENDIDO') {
    				$scope.selection.push($scope.carros[i].id);
    			}
    		}
    		$scope.nome="";
    		$scope.descricao="";
			$scope.estado="";
			$scope.status="";
			$scope.toggle='!toggle';
        });
    }

    listarTodosCarros();

	$scope.adicionarCarro = function adicionarCarro() {
		if ($scope.nome == "" || $scope.descricao == "" || $scope.estado == "" || $scope.status == "") {
			alert("Por favor, preencha os campos nome, descrição, estado e status");
		} else {
		 $http.post(urlBase + '/carroes', {
             nome: $scope.nome,
             descricao: $scope.descricao,
             estado: $scope.estado,
             status: $scope.status
         }).success(function(data, status, headers) {
				 alert("Carro adicionado");
				  var carroNovoUri = headers()["location"];
	             listarTodosCarros();
		    });
		}
	};
		
	$scope.toggleSelection = function toggleSelection(carroUri) {
		var idx = $scope.selection.indexOf(carroUri);

		if (idx > -1) {
			$http.patch(carroUri, { status: 'NAO VENDIDO' }).success(function(data) {
				alert("Carro não vendido");
				listarTodosCarros();
			});
			$scope.selection.splice(idx, 1);
		} else {
			$http.patch(carroUri, { status: 'VENDIDO' }).success(function(data) {
				alert("Carro vendido");
				listarTodosCarros();
			});
			$scope.selection.push(carroUri);
		}
	};
	  
	$scope.carrosArquivados = function carrosArquivados() {
		$scope.selection.forEach(function(carroUri) {
			if (carroUri != undefined) {
				$http.patch(carroUri, { vendido: 1});
			}
		});
		alert("Arquivado com sucesso");
		listarTodosCarros();
	};
});

carroModulo.directive('ngConfirmClick', [
	function() {
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Confirma esta ação?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if (window.confirm(msg)) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);