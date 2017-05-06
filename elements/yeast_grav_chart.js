function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
	if(!u.hasOwnProperty(arr[i])) {
	    a.push(arr[i]);
	    u[arr[i]] = 1;
	}
    }
    return a;
}



// Define the class for a new element called custom-element
class CustomElement extends Polymer.Element {
    static get is() { return "custom-element"; }
    constructor() {
	super();
	//this.textContent = "I'm a custom-element.";
    }
    connectedCallback() {

	//this.innerHTML = "I'm a custom-element"  //can't be set in constructor()
	this.innerHTML = '<h1>R099</h1><div id="container" style="width:100%; height:400px;"></div>'

	
	


	var nandus = _.filter(GOOGLE,function(e){
	    return e.RID=="R099";
	})

	var rids = unique(_.map(GOOGLE,function(e){return e.RID}))
	var batches = unique(_.map(nandus,function(e){return e.BATCH}))
	var days = [0,1,2,3,4,5,6,7,8,9,10]
	var all_batches=[]
	var xax = days
	

	for(var i = 0 ; i < batches.length; i++){
	    var b = batches[i]
	    var batch = _.filter(nandus,function(e){return e.BATCH==b;})
	    
	    var    firstdate=Math.min(..._.map(nandus,function(e){return new Date(e.DATE)}))

	    var batchdays = _.map(batch,function(e){
		var 	d = new Date(e.DATE)
		return (d -firstdate)/ 24 / 60 / 60 / 1000;
	    })

	    var byday = _.object(days, _.pluck(batch,"GRAVITY"));

	    var yvals = []
	    for (var d in days){
		yvals.push(byday[d])
	    }

	    all_batches.push({name:b,
			      data:yvals})
	    
	}


	Highcharts.chart('container', {
	    title: {
		text: 'Nandu batch gravities by day'
	    },
	    subtitle: {
		text: 'Measured from electronic cellar logs'
	    },
	    yAxis: {
		title: {
		    text: 'Gravity'
		}
	    },
	    legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'middle'
	    },
	    plotOptions: {
		series: {
		    connectNulls: true,
		}
	    },
	    series: all_batches
	});
	console.info( 'connected' )
    }
}
// Register the new element with the browser
customElements.define(CustomElement.is, CustomElement);
