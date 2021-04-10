const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
          progress:0,
          done:0,
          total: jobs.length
        }
        
        // Total de horas por dia de cada job em progress
        let jobTotalHours = 0;


        // map() = ele permite receber algo, no caso, um array novo, diferente do forEach que não possibilita
        const updatedJobs = jobs.map((job) => {
          
          const remaining = JobUtils.remainingDays(job)
          // Ternário que ele verifica se falta menos ou 0 dias o status é done senão progress
          const status = remaining <= 0 ? "done" : "progress";

          // status = done
          // statusCount[done] +=1
          // Caso o status = progress, então statusCount[progress] +=1
          // Somando a quantidade de status
          statusCount[status] +=1

          jobTotalHours = status === "progress" ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
          
          // ...job = espalhamento, trazendo as propriedades sem precisar escrever novamente.
          return{ 
            ...job,
            remaining,
            status,
            budget: JobUtils.calculateBudget(job, profile["value-hour"])
        }
      })

        // Quantidade de horas que quero trabalhar (Profile)
        // menos quantidade de horas/dia dedicada a cada job em progresso
        const freeHours = profile["hours-per-day"] - jobTotalHours;
      
        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}

