var faker = require('faker');

// var database = { products: []};

// for (var i = 1; i<= 300; i++) {
//   database.products.push({
//     id: i,
//     name: faker.commerce.productName(),
//     description: faker.lorem.sentences(),
//     price: faker.commerce.price(),
//     imageUrl: "https://source.unsplash.com/1600x900/?product",
//     quantity: faker.random.number()
//   });
// }
// console.log(JSON.stringify(database));


// ---COLBill fake----
var database = { billDetail: [], COLBill: []};

for (var i = 1; i<= 10; i++) {
  database.COLBill.push({
    colId: i,
    contractId: i,
    renterId: i,
    ownerID:i,
    placeId: i,
    dateCollect: "20/11/2020",
    totalExpense: i,
    paymentStatusId: i,
    paymentStatusName: "Đã thanh toán",
  });

}

console.log(JSON.stringify(database));

// ---COLBill fake----

for (var i = 1; i<= 5; i++) {
  database.billDetail.push({
    colId: i,
    costId: i,
    amount: null,
    expensePerCost: i,

    costName: "1 tháng",
    costPrice: i*1000000,
    unitName: "string"
  });

}

console.log(JSON.stringify(database));
