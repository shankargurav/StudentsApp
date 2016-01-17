using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace StudentsApp
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        //private const string ROOT_DOCUMENT = "/home.html";

        //protected void Application_BeginRequest(Object sender, EventArgs e)
        //{
        //    string url = Request.Url.LocalPath;
        //    if (!System.IO.File.Exists(Context.Server.MapPath(url)))
        //        Context.RewritePath(ROOT_DOCUMENT);
        //}

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
