package com.dunnsolutions.portlet.responsive.carousel.action;

import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import java.util.LinkedList;
import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;

public class ConfigurationActionImpl extends DefaultConfigurationAction {
    public ConfigurationActionImpl() {
    }

    public void processAction(PortletConfig portletConfig, ActionRequest actionRequest, ActionResponse actionResponse) throws Exception {
        String cmd = ParamUtil.getString(actionRequest, "cmd");
        if(cmd.equals("update")) {
            this.updateCarouselImages(actionRequest);
            super.processAction(portletConfig, actionRequest, actionResponse);
        }
    }

    protected void updateCarouselImages(ActionRequest actionRequest) throws Exception {
        int[] carouselImagesIndexes = StringUtil.split(ParamUtil.getString(actionRequest, "carouselImagesIndexes"), 0);
        LinkedList imageUrlsList = new LinkedList();
        LinkedList captionsList = new LinkedList();
        LinkedList linksList = new LinkedList();
        int[] var9 = carouselImagesIndexes;
        int links = carouselImagesIndexes.length;

        for(int captions = 0; captions < links; ++captions) {
            int imageUrls = var9[captions];
            String imageUrl = ParamUtil.getString(actionRequest, "imageUrl" + imageUrls);
            String caption = ParamUtil.getString(actionRequest, "caption" + imageUrls);
            String link = ParamUtil.getString(actionRequest, "link" + imageUrls);
            if(!Validator.isNull(imageUrl)) {
                imageUrlsList.add(imageUrl);
                captionsList.add(caption);
                linksList.add(link);
            }
        }

        String[] var13 = (String[])imageUrlsList.toArray(new String[imageUrlsList.size()]);
        String[] var14 = (String[])captionsList.toArray(new String[captionsList.size()]);
        String[] var15 = (String[])linksList.toArray(new String[linksList.size()]);
        this.setPreference(actionRequest, "imageUrls", var13);
        this.setPreference(actionRequest, "captions", var14);
        this.setPreference(actionRequest, "links", var15);
    }
}

