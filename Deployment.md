# Deployment Documentation

## Application Deployment with AWS Amplify

My podcast application is deployed using **AWS Amplify**. You can access
it here:\
🔗 [Podcast Application](https://main.ddkxzcabzf5x9.amplifyapp.com/)

------------------------------------------------------------------------

## AWS Service

I decided to use AWS Amplify for deployment because:

-   **Ease of Deployment**: Amplify provides a simple and fast way to
    host web applications without needing to manually configure servers.
    Automatically detects if you’re using Angular, React, Vue, Next.js, 
    etc., and configures the build.
-   **Integration with Git**: It connects directly with
    GitHub/GitLab/Bitbucket repositories for CI/CD (Continuous
    Integration and Continuous Deployment).
-   **Scalability**: Automatically scales the application as traffic
    grows, with no extra configuration needed.
-   **Custom Domains and HTTPS**: Provides free HTTPS for the default
    domain and allows attaching custom domains easily.
-   **Monitoring and Logs**: Built-in monitoring, logs, and error
    tracking for deployments.

------------------------------------------------------------------------

## Deployment Steps

1.  **Pushed Code to GitHub**
    -   My podcast application was version controlled using GitHub.
2.  **Connected GitHub Repository to Amplify**
    -   Logged into the AWS Management Console.\
    -   Opened the **Amplify Console**.\
    -   Chose **New App → Host web app**.\
    -   Connected my GitHub repository.\
    -   Selected the correct branch (e.g., `main`).
3.  **Configured Build Settings**
    -   Amplify automatically detected that my project is built with
        Angular.\
    -   Used the default `amplify.yml` build settings.
4.  **Deployment**
    -   Amplify built the project, deployed it, and provided a live
        URL:\
        👉 https://main.ddkxzcabzf5x9.amplifyapp.com/
5.  **Verification**
    -   Opened the provided domain link to confirm the application was
        successfully deployed.

------------------------------------------------------------------------

## Cost of Using AWS Amplify

Amplify uses a **pay-as-you-go** pricing model. You are **not charged
just for keeping the app active** --- charges apply only when you deploy
new builds, store files, or serve data to users.

### Free Tier (First 12 Months)

-   **Build & Deploy**: Up to 1,000 build minutes per month free.\
-   **Storage**: 5 GB storage free per month.\
-   **Data Transfer (Bandwidth)**: 15 GB served free per month.\
-   **SSR (Server-Side Rendering)**: 500,000 requests + 100 GB-hours
    free per month.

### After Free Tier

-   **Build & Deploy**: \$0.01 per build minute beyond the free limit.\
-   **Storage**: \$0.023 per GB per month beyond 5 GB.\
-   **Data Transfer**: \$0.15 per GB served beyond 15 GB.\
-   **SSR**: \$0.30 per 1M requests and \$0.20 per GB-hour duration.

### Example Scenario for My Podcast App

-   Angular build size: \~50--100 MB → well below 5 GB free storage.\
-   Typical builds: \~4 minutes each, 5--10 deployments per month →
    \~20--40 build minutes (out of 1,000 free).\
-   Expected traffic: \< 1 GB per month initially (well below 15 GB
    free).

**Estimated cost during free tier: \$0**\
**Estimated cost after free tier (with light usage): likely under
\$1/month.**

------------------------------------------------------------------------

## Benefits of Using AWS Amplify

-   **Speed**: Quick setup and automatic build/deployment pipeline.\
-   **Managed Hosting**: No need to manually manage servers, SSL
    certificates, or scaling.\
-   **CI/CD**: Any code pushed to the connected branch automatically
    triggers a new deployment.\
-   **Scalable & Reliable**: Backed by AWS infrastructure, ensuring high
    availability.\
-   **Developer Friendly**: Minimal DevOps effort required, making it
    easier to focus on app features instead of infrastructure.

------------------------------------------------------------------------

## Conclusion

AWS Amplify was the best choice for deploying my podcast application
because it offers an easy-to-use, reliable, and scalable hosting
solution. It reduced deployment complexity, provided me with a secure
and fast way to make my app available to users, and is cost-effective
--- especially within the Free Tier.
