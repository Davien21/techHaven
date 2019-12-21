console.log("it's linked!");
let view_stock_btn = document.querySelectorAll('a.view-stock');
// let stock_modal = document.querySelector('.modal');
let modal_close_btn = document.querySelector('.closebtn')
let stock_suppliers = document.querySelectorAll('.supplier');
let item_quantities = document.querySelectorAll('.quantity_in_stock');
let instock_alert = document.querySelectorAll('.in_stock_span');
let item_name = document.querySelectorAll('.item-name');
let item_cost_price = document.querySelectorAll('.cost_price');
let item_selling_price = document.querySelectorAll('.selling_price');
let funds_element = document.querySelector('.funds_output');
let buy_stock = document.querySelectorAll(".buy_stock_btn");
let sell_stock = document.querySelectorAll(".sell_stock_btn");
let min_stock_level = document.querySelectorAll(".min_stock");
let max_stock_level = document.querySelectorAll(".max_stock");
let all_stock = [];
let quantity_to_buy;
let quantity_to_sell;
let funds_available = 6000000;
danger_level = 2000000;
let regularFormat = new Intl.NumberFormat();
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
		each_item.in_stock = instock_alert[i].innerText;
		all_stock.push(each_item);
	}
	all_stock.funds = funds_available;
	all_stock.funds_danger = danger_level;
}
assign_items_as_stock() 
let buy_an_item = (btn_clicked_index,array) => {
	for (let i = 0;i<array.length;++i) {
		if (btn_clicked_index === array.indexOf(array[i])) {
			let quantity_to_be_bought = prompt_user_to_buy(array[i].name);
			console.log(array.funds<(quantity_to_be_bought*array[i].cost_price));
			if (array.funds<(quantity_to_be_bought*array[i].cost_price)) {
				alert("Not enough funds to buy "+quantity_to_be_bought +" "+array[i].name);
				quantity_bought = 0;
				array[i].quantity_in_stock += parseInt(quantity_bought);
				item_quantities[i].innerText = array[i].quantity_in_stock;
				all_stock.funds -= array[i].selling_price*parseInt(quantity_bought);
				funds_element.innerText = "N"+regularFormat.format(all_stock.funds)
			
				
			}else {
				quantity_bought = quantity_to_be_bought;
				array[i].quantity_in_stock += parseInt(quantity_bought);
				item_quantities[i].innerText = array[i].quantity_in_stock;
				all_stock.funds -= array[i].selling_price*parseInt(quantity_bought);
				funds_element.innerText = "N"+regularFormat.format(all_stock.funds)
			}
			
		}
	}
}
let sell_an_item = (btn_clicked_index,array,stock_status) => {
	for (let i = 0;i<array.length;++i) {
		if (btn_clicked_index === array.indexOf(array[i])) {
			let quantity_to_be_sold = prompt_user_to_sell(array[i].name);
			let user_decision;
			let stock_difference = array[i].quantity_in_stock-quantity_to_be_sold;
			if (array[i].quantity_in_stock<quantity_to_be_sold) {
				alert("We don't have up to "+quantity_to_be_sold +" "+array[i].name);
				quantity_to_be_sold = 0;
			}else if (stock_difference<array[i].min_stock_level) {
				if (array[i].quantity_in_stock>array[i].min_stock_level)
				user_decision = 
					prompt(
						"This sale will take quantity below stock level.\n" +
						"Press Ok to proceed Or cancel to abort.")
					if (user_decision === null) {
						quantity_to_be_sold =0;
					}
					else {
						quantity_to_be_sold = quantity_to_be_sold;
					}
			}
			array[i].quantity_in_stock -= parseInt(quantity_to_be_sold);
			if (array[i].quantity_in_stock === 0) {
				array[i].in_stock = "Out of Stock";
				instock_alert[i].innerText = "Out of Stock";
				instock_alert[i].className = "out_of_stock";
			}
			item_quantities[i].innerText = array[i].quantity_in_stock;
			console.log(array[i].quantity_in_stock)
			all_stock.funds += array[i].selling_price*parseInt(quantity_to_be_sold);
			funds_element.innerText = "N"+regularFormat.format(all_stock.funds)
			break;
		}
	}
}
let prompt_user_to_buy = (displaying_variable,btn_clicked_index) => {
	let prompt_variable = prompt("How many " + displaying_variable + " do you want to Buy?");
	let number_value = parseInt(prompt_variable);
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
			sell_an_item(each_btn.index,all_stock);
		}
	} 
}
let handle_view_stock_click = () => {
	for(let i = 0;i<view_stock_btn.length;++i) {
		let each_view_stock_btn = view_stock_btn[i];
		each_view_stock_btn.onclick = ()=> {
			// displayModal(modal);
		}
	}
}
handle_view_stock_click()
handle_buy_stock_clicks()
handle_sell_stock_clicks()