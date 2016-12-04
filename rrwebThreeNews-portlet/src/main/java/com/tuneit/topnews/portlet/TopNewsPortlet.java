package com.tuneit.topnews.portlet;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.repository.model.FileEntry;
import com.liferay.portal.kernel.servlet.BrowserSnifferUtil;
import com.liferay.portal.kernel.servlet.SessionErrors;
import com.liferay.portal.kernel.upload.UploadPortletRequest;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.MimeTypesUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.service.ServiceContextFactory;
import com.liferay.portal.theme.ThemeDisplay;
import com.liferay.portal.util.PortalUtil;
import com.liferay.portlet.documentlibrary.DuplicateFileException;
import com.liferay.portlet.documentlibrary.DuplicateFolderNameException;
import com.liferay.portlet.documentlibrary.FileExtensionException;
import com.liferay.portlet.documentlibrary.FileMimeTypeException;
import com.liferay.portlet.documentlibrary.FileNameException;
import com.liferay.portlet.documentlibrary.FileSizeException;
import com.liferay.portlet.documentlibrary.NoSuchFileEntryException;
import com.liferay.portlet.documentlibrary.NoSuchFolderException;
import com.liferay.portlet.documentlibrary.SourceFileNameException;
import com.liferay.portlet.documentlibrary.model.DLFileEntry;
import com.liferay.portlet.documentlibrary.service.DLAppServiceUtil;
import com.liferay.util.bridges.mvc.MVCPortlet;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletPreferences;
import javax.servlet.http.HttpServletRequest;

public class TopNewsPortlet extends MVCPortlet {
    private static final int DEFAULT_WIDTH = 260;
    private static final int DEFAULT_HEIGHT = 250;
    private static final Log log = LogFactoryUtil.getLog(TopNewsPortlet.class);
    private static final String[] parameterNames = new String[]{"NewsURL", "NewsText", "NewsDay", "NewsMonth", "NewsYear"};

    public TopNewsPortlet() {
    }

    public void updatePreferences(ActionRequest req, ActionResponse res) throws Exception {
        try {
            PortletPreferences e = req.getPreferences();
            UploadPortletRequest uploadRequest = PortalUtil.getUploadPortletRequest(req);
            ThemeDisplay themeDisplay = (ThemeDisplay)req.getAttribute("LIFERAY_SHARED_THEME_DISPLAY");
            long groupId = themeDisplay.getScopeGroupId();
            long folderId = ParamUtil.getLong(uploadRequest, "folderId");
            long repositoryId = ParamUtil.getLong(uploadRequest, "repositoryId");
            String changeLog = ParamUtil.getString(uploadRequest, "changeLog");
            String redirect = ParamUtil.getString(uploadRequest, "redirectURL");
            String name = ParamUtil.getString(uploadRequest, "name");
            String filePosition = ParamUtil.getString(uploadRequest, "uploadField");
            String fileFieldPosition = filePosition.concat("File");
            String fileName = uploadRequest.getFileName(fileFieldPosition);
            String description = ParamUtil.getString(uploadRequest, "description", fileName);
            File file = uploadRequest.getFile(fileFieldPosition);
            String parameterName;
            if(file != null && fileName.length() > 0) {
                file = this.scaleImage(file, 260, 250);
                log.debug(file.getName());
                String arr$ = this.getContentType(uploadRequest, file, fileFieldPosition);
                if(arr$.equals("application/octet-stream")) {
                    String len$ = GetterUtil.getString(FileUtil.getExtension(file.getName())).toLowerCase();
                    if(Validator.isNotNull(len$)) {
                        arr$ = MimeTypesUtil.getContentType(len$);
                    }
                }

                if(Validator.isNull(name)) {
                    name = fileName;
                }

                FileEntry var33;
                try {
                    var33 = DLAppServiceUtil.getFileEntry(groupId, folderId, name);
                    DLAppServiceUtil.deleteFileEntry(var33.getFileEntryId());
                } catch (NoSuchFileEntryException var29) {
                    ;
                } finally {
                    var33 = DLAppServiceUtil.addFileEntry(repositoryId, folderId, name, arr$, name, description, changeLog, file, ServiceContextFactory.getInstance(DLFileEntry.class.getName(), req));
                }

                String i$ = PortalUtil.getPortalURL(req) + "/documents/" + repositoryId + "/" + folderId + "/" + var33.getTitle();
                parameterName = filePosition + "ImageURL";
                e.setValue(parameterName, i$);
            } else {
                e.setValue(filePosition + "ImageURL", ParamUtil.getString(uploadRequest, "imageURL"));
            }

            String[] var32 = parameterNames;
            int var34 = var32.length;

            for(int var35 = 0; var35 < var34; ++var35) {
                parameterName = var32[var35];
                String parameterKey = filePosition.concat(parameterName);
                String parameterValue = ParamUtil.getString(uploadRequest, parameterKey);
                e.setValue(parameterKey, parameterValue);
            }

            e.store();
            this.sendRedirect(req, res, redirect);
        } catch (DuplicateFolderNameException | FileExtensionException | FileMimeTypeException | FileNameException | FileSizeException | NoSuchFolderException | NoSuchFileEntryException | SourceFileNameException | DuplicateFileException var31) {
            SessionErrors.add(req, var31.getClass().getName());
        }

    }

    protected String getContentType(UploadPortletRequest uploadRequest, File file, String fileFieldPosition) {
        String contentType = GetterUtil.getString(uploadRequest.getContentType(fileFieldPosition));
        if(contentType.equals("application/octet-stream")) {
            String ext = GetterUtil.getString(FileUtil.getExtension(file.getName())).toLowerCase();
            if(Validator.isNotNull(ext)) {
                contentType = MimeTypesUtil.getContentType(ext);
            }
        }

        return contentType;
    }

    protected void sendRedirect(ActionRequest actionRequest, ActionResponse actionResponse, String redirect) throws IOException {
        if(SessionErrors.isEmpty(actionRequest)) {
            this.addSuccessMessage(actionRequest, actionResponse);
        }

        if(Validator.isNull(redirect)) {
            redirect = ParamUtil.getString(actionRequest, "redirect");
        }

        if(Validator.isNotNull(redirect)) {
            HttpServletRequest request = PortalUtil.getHttpServletRequest(actionRequest);
            if(BrowserSnifferUtil.isIe(request) && (double)BrowserSnifferUtil.getMajorVersion(request) == 6.0D && redirect.contains("#")) {
                String redirectToken = "&#";
                if(!redirect.contains("?")) {
                    redirectToken = "?" + redirectToken;
                }

                redirect = StringUtil.replace(redirect, "#", redirectToken);
            }

            actionResponse.sendRedirect(redirect);
        }

    }

    private File scaleImage(File file, int tw, int th) throws IOException {
        BufferedImage image = new BufferedImage(tw, th, 2);
        Graphics2D graphics = image.createGraphics();

        label37: {
            Object w;
            try {
                graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
                graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
                BufferedImage output = ImageIO.read(file);
                int w1 = output.getWidth();
                int h = output.getHeight();
                double scale = Math.min(Math.min((double)tw / (double)w1, (double)th / (double)h), 1.0D);
                int x = (int)(((double)tw - (double)w1 * scale) / 2.0D);
                int y = (int)(((double)th - (double)h * scale) / 2.0D);
                Image scaled = output.getScaledInstance((int)((double)w1 * scale), (int)((double)h * scale), 4);
                graphics.setColor(new Color(0, 0, 0, 0));
                graphics.fillRect(0, 0, tw, th);
                graphics.drawImage(scaled, x, y, (ImageObserver)null);
                break label37;
            } catch (NullPointerException var17) {
                w = null;
            } finally {
                graphics.dispose();
            }

            return (File)w;
        }

        File output1 = new File(file.getPath());
        ImageIO.write(image, "png", output1);
        return output1;
    }
}
