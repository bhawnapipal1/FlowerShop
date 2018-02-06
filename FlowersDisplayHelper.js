({
    getFlowers: function(component, next,prev,offset, searchText,intPrice,selectedColor, helper) {
        offset = offset || 0;
        var action =  component.get("c.fetchFlowers");       
        action.setParams({
			"next" : next,
			"prev" : prev,
			"off" : offset ,
			"searchText":searchText,
			"intPrice":intPrice,
			"SelectedColor":selectedColor         
        });
        // set a call back   
        action.setCallback(this, function(response) {        
        //debugger;
            var state = response.getState();
            if(component.isValid() && state === "SUCCESS"){
				var result = response.getReturnValue();
				console.log('result ---->' + JSON.stringify(result));                
				component.set("v.displayFlowers", result);
				component.set("v.item", null);
				component.set('v.offset',result.offst);                
				component.set('v.next',result.hasnext);
				component.set('v.prev',result.hasprev);
            }
            else if(state === "ERROR"){
                console.log('Failed with below state: ' + state);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }else{
                        console.log("Unknown Error");
                    }
                }
            }
        });
        $A.enqueueAction(action); 
   },
    
    fetchPickListVal: function(component) {
        //debugger;
        var action = component.get("c.getColors");
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 				console.log('---allValues--'+allValues);
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({                        
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
				component.set("v.colors", opts); 
            }
        });
        $A.enqueueAction(action);
    }
})