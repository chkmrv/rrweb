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

        List<String> imageUrlsList = new LinkedList<String>();
        List<String> captionsList = new LinkedList<String>();
        List<String> textsList = new LinkedList<String>();
        List<String> linksList = new LinkedList<String>();

        for (int carouselImagesIndex : carouselImagesIndexes) {
            String imageUrl = ParamUtil.getString(actionRequest, "imageUrl" + carouselImagesIndex);
            String caption = ParamUtil.getString(actionRequest, "caption" + carouselImagesIndex);
            String text = ParamUtil.getString(actionRequest, "text" + carouselImagesIndex);
            String link = ParamUtil.getString(actionRequest, "link" + carouselImagesIndex);

            if (Validator.isNull(imageUrl)) {
                continue;
            }

            imageUrlsList.add(imageUrl);
            captionsList.add(caption);
            textsList.add(text);
            linksList.add(link);
        }

        String[] imageUrls = imageUrlsList.toArray(new String[imageUrlsList.size()]);
        String[] captions = captionsList.toArray(new String[captionsList.size()]);
        String[] texts = textsList.toArray(new String[textsList.size()]);
        String[] links = linksList.toArray(new String[linksList.size()]);

        setPreference(actionRequest, "imageUrls", imageUrls);
        setPreference(actionRequest, "captions", captions);
        setPreference(actionRequest, "texts", texts);
        setPreference(actionRequest, "links", links);
    }
}