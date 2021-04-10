module.exports = {
    remainingDays(job){
      //Calculo dos dias restantes
      // Função toFixed() arredonda o valor e transforma em string
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
      const createdDate = new Date(job.created_at)
      // getDay = dias da semana (0 a 6) | getDate = dia do mês
      // Number() converte para numero novamente
      const dueDay = createdDate.getDate() + Number(remainingDays)
      //setDate() = retorna o valor em milesegundos
      const dueDate = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDate - Date.now()
    
      //Transformar milesegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24
      // Math.floor = arredonda para baixo
      // Correção para Math.ceil = arredonda para cima
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
      // restam x dias
      return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }