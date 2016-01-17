using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsApp.Models
{
    public class Student
    {
        public int StudentId { get;set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public int Age { get; set; }

    }
}