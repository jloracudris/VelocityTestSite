'use strict';

var app = angular.module('app', [
	'ngTable']);


app.controller('outletsController', function($http, $scope, NgTableParams) 
{
	
	var obj = 
	{
		outlets:null,
		contacts:null 
	};	
	
	$scope.data = [];
	
	$http.get('data/Outlets.json').success(function(response) 
	{		
        obj.outlets = response;
    });
	
	$http.get('data/Contacts.json').success(function(response) 
	{		
        obj.contacts = response;		
		
		obj.contacts.forEach(function(contact)
		{			
			obj.outlets.forEach(function(outlet)
			{				
				if(contact.outletId === outlet.id)
				{
					$scope.data.push({"contactName": contact.firstName +' '+ contact.lastName, "title": contact.title, "outletName": outlet.name, "profile": contact.profile})
				}
			});
		});	
		
		$scope.customConfigParams = createUsingFullOptions();

		function createUsingFullOptions() 
		{
		  var initialParams = {
			count: 25 // initial page size
		  };
		  var initialSettings = 
		  {			
			counts: [],			
			paginationMaxBlocks: 13,
			paginationMinBlocks: 2,
			dataset: $scope.data
		  };
		  return new NgTableParams(initialParams, initialSettings);
		}
    });	
	
});
