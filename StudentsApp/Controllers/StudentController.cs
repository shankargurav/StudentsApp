using StudentsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace StudentsApp.Controllers
{
    public class StudentsController : ApiController
    {

        static List<Student> students = new List<Student>
        {
            new Student {StudentId=1, FirstName = "Fname1", LastName="Lname1", Age=25 },
            new Student {StudentId=2, FirstName = "Fname2", LastName="Lname2", Age=31 },
            new Student {StudentId=3, FirstName = "Fname3", LastName="Lname3", Age=21 }
        };
        public IEnumerable<Student> Get()
        {
            return students;
        }

        static int maxId = 3;

        public void Post([FromBody]Student value)
        {
            var headers = HttpContext.Current.Request.Headers;
            IEnumerable<string> headerValues = headers.GetValues("CommandType");
            var commandType = headerValues.FirstOrDefault();
            if (commandType != "AddStudent")
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            value.StudentId = ++maxId;
            students.Add(value);
            HttpContext.Current.Response.AddHeader("Location", "/viewStudents" + value.StudentId);
        }

        public Student Get(int id)
        {
            return students.Single(t => t.StudentId == id);
        }


        public void Put(int id, [FromBody]Student value)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            students = students.Where(t => t.StudentId != id).ToList();
        }
    }
}