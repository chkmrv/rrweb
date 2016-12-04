<%@ page import="com.liferay.portal.kernel.template.*" %>
<%@ page import="com.liferay.portal.theme.NavItem" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>

<liferay-theme:defineObjects />
<nav class="nav_css_class navbar site-navigation" id="navigation" role="navigation">
    <div class="navbar-inner">
        <div class="collapse nav-collapse main_menu">
            <ul class="main_menu_list" role="menubar">
                

                <%
                    TemplateResource templateResource = new StringTemplateResource("0", "# Placeholder");
                    Template template = TemplateManagerUtil.getTemplate(TemplateConstants.LANG_TYPE_VM, templateResource, false);
                    List<NavItem> navItems = NavItem.fromLayouts(request, layouts, template);
                    for (NavItem navItem : navItems) {

                        String navItem_attr_selected = "";
                        String navItem_attr_has_popup = "";
                        String navItem_caret = "";
                        String navItem_css_class = "lfr-nav-item";
                        String navItem_link_css_class = "";

                        if (navItem.isSelected()) {
                            navItem_attr_selected = "aria-selected='true'";
                            navItem_css_class = "navItem_css_class selected active";
                        }

                        if (navItem.hasChildren()) {
                            navItem_attr_has_popup = "aria-haspopup='true'";
                            navItem_caret = "<span class='lfr-nav-child-toggle'><i class='icon-caret-down'></i></span>";
                            navItem_css_class = "navItem_css_class dropdown";
                            navItem_link_css_class = "dropdown-toggle";
                        }
                %>
                <li class="<%=navItem_css_class%> main_menu_item"
                    id="layout_<%=navItem.getLayoutId()%>" <%=navItem_attr_selected%> role="presentation">
                    <a aria-labelledby="layout_<%=navItem.getLayoutId()%>" 
                     <%=navItem_attr_has_popup%>
                       class="<%=navItem_link_css_class%> main_menu_link"
                       href="<%=navItem.getURL()%>" 
                       <%=navItem.getTarget()%> role="menuitem">
                        <span><%=navItem.getName()%><%=navItem_caret%></span>
                    </a>
                    <%
                        if (navItem.hasChildren()) {

                    %>
                    <ul class="dropdown-menu child-menu submenu_level1" role="menu">
                        <%
                            for (NavItem navChild : navItem.getChildren()) {
                                String nav_child_attr_selected = "";
                                String nav_child_css_class = "lfr-nav-item";

                                if (navChild.isSelected()) {
                                    nav_child_attr_selected = "aria-selected='true'";
                                    nav_child_css_class = "selected";
                                }

                        %>
                        <li class="<%=nav_child_css_class%> level1_item "
                            id="layout_<%=navChild.getLayoutId()%>" <%=nav_child_attr_selected%> role="presentation">
                            <a class="level1_link" aria-labelledby="layout_<%=navChild.getLayoutId()%>"
                               href="<%=navChild.getURL()%>" <%=navChild.getTarget()%>
                               role="menuitem"><%=navChild.getName()%>
                            </a>
                        </li>
                        <%
                            }%>
                    </ul>
                    <%
                        }
                    %>
                </li>
                <%
                    }%>
            </ul>
        </div>
    </div>
</nav>

<script>
    Liferay.Data.NAV_LIST_SELECTOR = '.navbar-inner .nav-collapse > ul';
</script>