using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AHAH.Example.MVC4.Filters
{
    public class AhahLayoutAttribute : ActionFilterAttribute
    {
        private static string _AhahLayout;
        private static string _AhahTrigger;

        public static string AhahLayout
        {
            get
            {
                if (String.IsNullOrWhiteSpace(_AhahLayout))
                {
                    _AhahLayout = ConfigurationManager.AppSettings["Ahah:LayoutName"];
                }
                return _AhahLayout;
            }

        }
        public static string AhahTrigger
        {
            get
            {
                if (String.IsNullOrWhiteSpace(_AhahTrigger))
                {
                    _AhahTrigger = ConfigurationManager.AppSettings["Ahah:QueryTrigger"];
                }
                return _AhahTrigger;
            }

        }


        public AhahLayoutAttribute() { }

        public AhahLayoutAttribute(string layout)
        {
            _AhahLayout = layout;
        }

        public AhahLayoutAttribute(string layout, string trigger)
        {
            _AhahLayout = layout;
            _AhahTrigger = trigger;
        }
        public override void OnResultExecuting(ResultExecutingContext filtercontext)
        {
            if (filtercontext != null && 
                filtercontext.HttpContext != null &&
                filtercontext.HttpContext.Request != null && 
                filtercontext.HttpContext.Request.QueryString != null)
            {
                var trigger = filtercontext.HttpContext.Request.QueryString[AhahTrigger];

                if (!String.IsNullOrWhiteSpace(trigger) &&
                    String.Equals(trigger, Boolean.TrueString,
                    StringComparison.InvariantCultureIgnoreCase))
                {
                    var viewresult = filtercontext.Result as ViewResult;
                    if (viewresult != null)
                    {
                        viewresult.MasterName = AhahLayout;
                    }
                }
            }
        }
    }
}