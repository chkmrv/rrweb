package com.dunnsolutions.portlet.responsive.carousel.action;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;

import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;
import com.liferay.portal.kernel.util.Constants;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;

public class ConfigurationActionImpl extends DefaultConfigurationAction {

    @Override
    public void processAction(PortletConfig portletConfig, ActionRequest actionRequest, ActionResponse actionResponse) throws Exception {

        String cmd = ParamUtil.getString(actionRequest, Constants.CMD);

        if (cmd.equals(Constants.UPDATE)) {
            updateCarouselImages(actionRequest);

            super.processAction(portletConfig, actionRequest, actionResponse);

            return;
        }
    }

    protected void updateCarouselImages(ActionRequest actionRequest) throws Exception {
        int[] carouselImagesIndexes = StringUtil.split(ParamUtil.getString(actionRequest, "carouselImagesIndexes"), 0);

        List<String> quantitysList = new LinkedList<String>();
        List<String> captionsList = new LinkedList<String>();
        List<String> linksList = new LinkedList<String>();
        

        for (int carouselImagesIndex : carouselImagesIndexes) {
            String quantity = ParamUtil.getString(actionRequest, "quantity" + carouselImagesIndex);
            String caption = ParamUtil.getString(actionRequest, "caption" + carouselImagesIndex);
            String link = ParamUtil.getString(actionRequest, "link" + carouselImagesIndex);

            if (Validator.isNull(quantity)) {
                continue;
            }

            quantitysList.add(quantity);
            captionsList.add(caption);
            linksList.add(link);
        }

        String[] quantitys = quantitysList.toArray(new String[quantitysList.size()]);
        String[] captions = captionsList.toArray(new String[captionsList.size()]);
        String[] links = linksList.toArray(new String[linksList.size()]);

        setPreference(actionRequest, "quantitys", quantitys);
        setPreference(actionRequest, "captions", captions);
        setPreference(actionRequest, "links", links);
    }
}