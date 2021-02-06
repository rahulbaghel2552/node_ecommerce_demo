const Menu = require("../../models/menu");
function homeController() {
  return {
    async index(req, res) {


        const pizza = await Menu.find(); 
        return res.render("home", { pizzas: pizza });

        
    //   Menu.find()
    //     .then(function (pizza) {
    //       console.log(pizza);
    //       return res.render("home", { pizzas: pizza });
    //     })
    //     .catch(function (err) {
    //       console.log("Error" + err);
    //     });
    },
  };
}

module.exports = homeController;
