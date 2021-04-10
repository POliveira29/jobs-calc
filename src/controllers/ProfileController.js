const Profile = require("../model/Profile")

module.exports = {
    async index(req, res){
      return res.render("profile", { profile: await Profile.get() })
    },
    async update(req,res){
      // req.body para pegar os dados
      const data = req.body

      // definir quantas semanas tem num ano:52
      const weeksPerYear = 52

      // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
      
      // Total de horas trabalhada na semana
      const weekTotalHours =  data["hours-per-day"] * data["days-per-week"]
     
      // total de horas trabalhadas no mes
      const monthlyTotalHours =  weekTotalHours * weeksPerMonth

      // Valor da minha hora
      const valueHour =  data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

      const profile = await Profile.get()
      
      await Profile.update({
        ...profile,
        // Dados do formulário que esta na view profile. Eles sobrescrevem os dados que estão espalhados acima.
        ...req.body,
        "value-hour": valueHour
      })

      return res.redirect("/profile")
    }
  }