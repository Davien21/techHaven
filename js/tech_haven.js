console.log("it's linked!");

let view_stock_btn = document.querySelectorAll('a.view-stock');
let stock_suppliers = document.querySelectorAll('.supplier');
let item_quantities = document.querySelectorAll('.quantity_in_stock');
let instock_alert = document.querySelectorAll('.in_stock_span');
let item_name = document.querySelectorAll('.item-name');
let item_cost_price = document.querySelectorAll('.cost_price');
let item_selling_price = document.querySelectorAll('.selling_price');
let buy_stock = document.querySelectorAll(".buy_stock_btn");
let sell_stock = document.querySelectorAll(".sell_stock_btn");
let min_stock_level = document.querySelectorAll(".min_stock");
let max_stock_level = document.querySelectorAll(".max_stock");
let all_stock = [];
let quantity_to_buy;
let quantity_to_sell;
let funds_available = 2000000;
danger_level = 1000000;
let assign_items_as_stock = () => {
	for(let i = 0;i<item_name.length;++i) {
		let each_item = {};
		each_item.name = item_name[i].innerText;
		each_item.supplier = stock_suppliers[i].innerText;
		each_item.cost_price = parseInt(item_cost_price[i].innerText);
		each_item.selling_price = parseInt(item_selling_price[i].innerText);
		each_item.quantity_in_stock = parseInt(item_quantities[i].innerText);
		each_item.min_stock_level = parseInt(min_stock_level[i].innerText);
		each_item.max_stock_level = parseInt(max_stock_level[i].innerText);
		all_stock.push(each_item);

	}
	all_stock.funds = funds_available;
	all_stock.funds_danger = danger_level;
}

assign_items_as_stock() 
// console.log(all_stock)
let checkStock = (action,user_input)=> {
	user_input = parseInt(user_input)
	console.log("attempting to buy")
	for (let i = 0;i<all_stock.length;++i) {
		if(action === "buy") {
			console.log(user_input)
			console.log(all_stock[i].quantity_in_stock)
			console.log(all_stock[i].max_stock_level)
			break;
			// if ((user_input+all_stock.quantity_in_stock)>(all_stock.max_stock_level)) {
			// 	alert(user_input +",user input is greater than max stock level: " +all_stock.max_stock_level);
			// 	break;
			// }
			// else if (user_input<qty_in_stock && min_sk<(qty_in_stock-user_input)) {
			// 	let sales_decison = prompt("Selling " +user_input+ " " + itemName + " will take stock below minimum stock level" +"\n"+"Press Ok to proceed Or Cancel to abort");
			// 	if (sales_decison === null) {
			// 		return "cancel";
			// 	}else if (sales_decison === "") {
			// 		return "selling";
			// 	}
			// }
		}else if (action === "buy") {

		}
		// break;
	}
	// if (action === "sell") {
	// 	if (user_input>qty_in_stock) {
	// 		alert('Sorry, there are only ' +qty_in_stock+' items in stock' +"\n"+"You cannot sell " + user_input +" " + itemName);
	// 		return "cancel"
	// 	}else if (user_input<qty_in_stock && min_sk<(qty_in_stock-user_input)) {
	// 		let sales_decison = prompt("Selling " +user_input+ " " + itemName + " will take stock below minimum stock level" +"\n"+"Press Ok to proceed Or Cancel to abort");
	// 		if (sales_decison === null) {
	// 			return "cancel";
	// 		}else if (sales_decison === "") {
	// 			return "selling";
	// 		}
	// 	}
	// }
// 	else if (action === "buy") {
	
// 		if ((user_input+parseInt(qty_in_stock))>parseInt(max_sk)) {
			

// 			let buy_decision = prompt('You are attempting to buy above maximum stock level' +'\n'+'Press Ok to proceed Or Cancel to abort');
// 			if (buy_decison === null) {
// 				return "cancel";
// 			}else if (buy_decison === "") {
// 				return "buying";
// 			}
// 		}else if ((all_stock.funds-(user_input*parseInt(cost_to_buy)))<=parseInt(all_stock.funds_danger)) {
// 			alert("Sorry, cannot buy " +user_input +" "+itemName +" because funds will reach danger level"+ +'\n'+'Try Selling more ' +itemName);
// 			return "cancel"
// 		}

// 	}
}
let buy_an_item = (btn_clicked_index,array) => {
	for (let i = 0;i<array.length;++i) {
		if (btn_clicked_index === array.indexOf(array[i])) {
			let quantity_bought = prompt_user_to_buy(array[i].name);
				// console.log(quantity_bought)
				array[i].quantity_in_stock += parseInt(quantity_bought);
				item_quantities[i].innerText = array[i].quantity_in_stock;
				all_stock.funds -= array[i].selling_price*parseInt(quantity_bought);
				
			// if (check === "buying") {
				// console.log(quantity_bought)
			
			// }else if (check === "cancel") {
			// 	break;
			// 	return;
			// }
			
		}
	}

}
let sell_an_item = (btn_clicked_index,array,stock_status) => {
	// console.log(stock_status)
	for (let i = 0;i<array.length;++i) {
		if (btn_clicked_index === array.indexOf(array[i])) {
			let quantity_sold = prompt_user_to_sell(array[i].name);
			// console.log(quantity_sold)
			// array[i].quantity_in_stock -= parseInt(quantity_sold);
			// console.log(array[i].quantity_in_stock)
			// all_stock.funds += array[i].selling_price*parseInt(quantity_sold);
			break;
		}
	}
	// console.log(all_stock)

}
let prompt_user_to_buy = (displaying_variable) => {
	let prompt_variable = prompt("How many " + displaying_variable + " do you want to Buy?");
	let number_value = parseInt(prompt_variable);
	checkStock("buy",number_value)
	if (typeof number_value === "number" && !Number.isNaN(number_value)) {
		quantity_to_buy = number_value;
		return quantity_to_buy;
	}else if (Number.isNaN(number_value)) {
		quantity_to_buy = 0;
		return quantity_to_buy;
	}
}
let prompt_user_to_sell = (displaying_variable) => {
	let prompt_variable = prompt("How many " + displaying_variable + " do you want to Sell?");
	let number_value = parseInt(prompt_variable);
	if (typeof number_value === "number" && !Number.isNaN(number_value)) {
		quantity_to_sell = number_value;
		return quantity_to_sell;
	}else if (Number.isNaN(number_value)) {
		quantity_to_sell = 0;
		return quantity_to_sell;
	}
}

let handle_buy_stock_clicks = ()=> {
	for (let i=0;i<buy_stock.length;++i) {
		let each_btn = buy_stock[i];
		each_btn.index = i;
		each_btn.onclick = () => {
			
			buy_an_item(each_btn.index,all_stock)
		}
	} 
}
let handle_sell_stock_clicks = ()=> {
	for (let i=0;i<sell_stock.length;++i) {
		let each_btn = sell_stock[i];
		each_btn.index = i;
		each_btn.onclick = () => {
			checkStock("sell")
			sell_an_item(each_btn.index,all_stock,checkStock("sell"));

		}
	} 
}
handle_buy_stock_clicks()
handle_sell_stock_clicks()
// let tester = prompt("Get values of Ok " +"Or\n" +"Get values of Cancel");
// if (tester === null) {
// 	console.log(tester)
// }else if (tester === "") {
// 	console.log("I pressed ok")
// }
