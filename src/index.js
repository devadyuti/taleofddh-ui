import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify, Storage } from 'aws-amplify';
import { AWS_CONFIG } from './js/common/constants';
import App from './js/app';
import reportwebvitals from './js/common/reportwebvitals';

Amplify.configure({
    Auth: {
        region: AWS_CONFIG.cognito.REGION,
        userPoolId: AWS_CONFIG.cognito.USER_POOL_ID,
        identityPoolId: AWS_CONFIG.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: AWS_CONFIG.cognito.APP_CLIENT_ID
    },
    Storage: {
        AWSS3: {
            region: AWS_CONFIG.s3.REGION,
            bucket: AWS_CONFIG.s3.BLOG_BUCKET
        }
    },
    API: {
        endpoints: [
            {
                name: 'findMenuList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findPromotionList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findAboutUsList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findTermsAndConditionsList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findPrivacyPolicyList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findFrequentlyAskedQuestionList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findCountryByCode',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findCountryByName',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'createAuditEntry',
                endpoint: AWS_CONFIG.apiGateway.URL + '/core',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'createRequest',
                endpoint: AWS_CONFIG.apiGateway.URL + '/request',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findRequest',
                endpoint: AWS_CONFIG.apiGateway.URL + '/request',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updateSubscription',
                endpoint: AWS_CONFIG.apiGateway.URL + '/request',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findAlbumList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findRestrictedAlbumList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updateAlbumViewCount',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findAlbumPhotoList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION,
            },
            {
                name: 'findPhotoList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION,
            },
            {
                name: 'findRestrictedPhotoList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updatePhotoViewCount',
                endpoint: AWS_CONFIG.apiGateway.URL + '/gallery',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findBlogList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findCategorizedBlogList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updateBlogViewCount',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findBlogArticleList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findArticleList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findArticleCommentList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'addArticleComment',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'getArticleDocument',
                endpoint: AWS_CONFIG.apiGateway.URL + '/blog',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findIdentity',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'createUser',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findUser',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updateUser',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'createUserProfile',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findUserProfile',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'updateUserProfile',
                endpoint: AWS_CONFIG.apiGateway.URL + '/auth',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findLinkList',
                endpoint: AWS_CONFIG.apiGateway.URL + '/link',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findTravelDocuments',
                endpoint: AWS_CONFIG.apiGateway.URL + '/link',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'findCountryVisitStatus',
                endpoint: AWS_CONFIG.apiGateway.URL + '/link',
                region: AWS_CONFIG.apiGateway.REGION
            },
            {
                name: 'getTravelDocument',
                endpoint: AWS_CONFIG.apiGateway.URL + '/link',
                region: AWS_CONFIG.apiGateway.REGION
            }
        ]
    }
});
Storage.configure({level: 'protected'});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportwebvitals();
