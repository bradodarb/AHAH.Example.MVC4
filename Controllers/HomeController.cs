using AHAH.Example.MVC4.Filters;
using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AHAH.Example.MVC4.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        [GET("")]
        [AhahLayout]
        public ActionResult Index()
        {
            return View();
        }
        [GET("Orbit")]
        [AhahLayout]
        public ActionResult Orbit()
        {
            return View();
        }

        [GET("Boxy")]
        [AhahLayout]
        public ActionResult Boxy()
        {
            return View();
        }
    }
}
