({
    doInit: function(component, event, helper){
         //debugger; 
         var next = false;
         var prev = false;
         helper.getFlowers(component,next,prev);
         helper.fetchPickListVal(component,'Flowers_Master__c' ,'Color__c');          
	},     
    handleClick : function(component, event, helper) {
        //debugger;
        var searchText = component.get("v.searchText");
        var selectedColor = event.getParam('value');		
        var next = false;
        var prev = false;
        var offset =0;
        helper.getFlowers(component, next,prev,offset, searchText,null,selectedColor);   
        helper.fetchPickListVal(component,'Flowers_Master__c' ,'Color__c');
    },    
    handleChangeEvent : function(component, event, helper){
        var searchPrice = component.get("v.myval");
        var next = false;
        var prev = false;
        var offset =0;        
        helper.getFlowers(component, next,prev,offset, null,searchPrice,null);          
    },     
	handleClick1 : function(component, event) {		
        var message = event.getParam("message");		   
        // set the handler attributes based on event data
        component.set("v.item", message);        
	},    
    imgClick: function(component, event, helper){
        var counterVar = event.target.getAttribute("data-id");              
        var displayFlowersLst = component.get("v.displayFlowers");        
        component.set("v.item", displayFlowersLst.lstFlowerWrapper[counterVar].objFW);        
        var showDescriptionEvent = component.getEvent("showDescriptionEvent");
        showDescriptionEvent.setParams({ "message" : displayFlowersLst.lstFlowerWrapper[counterVar].objFW });  
        showDescriptionEvent.fire();
    },
    Next:function(component,event,helper){
        var next = true;
        var prev = false;
        var offset = component.get("v.offset");        
        helper.getFlowers(component,next,prev,offset); 
    },
    Previous:function(component,event,helper){
        var next = false;
        var prev = true;
        var offset = component.get("v.offset");
        helper.getFlowers(component,next,prev,offset); 
    },
	
})