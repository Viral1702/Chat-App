pipeline {
    agent any

    stages {
        stage('Pulling') {
            steps {
                git url: "https://github.com/Viral1702/Chat-App.git", branch: "main"
            }
        }

        stage('Inject env files') {
            steps {
                withCredentials([
                    file(credentialsId: 'chat-app-frontend-env', variable: 'FRONTEND_ENV'),
                    file(credentialsId: 'chat-app-backend-env', variable: 'BACKEND_ENV')
                ]) {
                    sh """
                    chmod +w ./frontend ./backend || true
                    rm -f ./frontend/.env ./backend/.env
                    cp \$FRONTEND_ENV ./frontend/.env
                    cp \$BACKEND_ENV ./backend/.env
                    ls -la ./frontend/.env ./backend/.env
                    """
                }
            }
        }

        stage('Building frontend image'){
            steps {
                sh "docker build -t chat-app-frontend:latest ./frontend"
            }
        }
        
        stage('Building backend image'){
            steps {
                sh "docker build -t chat-app-backend:latest ./backend"
            }
        }
        
        stage('Pushing both images in the dockerhub'){
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "dockerhubId",
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                    docker tag chat-app-frontend:latest \$DOCKER_USERNAME/chat-app-frontend:latest
                    
                    docker tag chat-app-backend:latest \$DOCKER_USERNAME/chat-app-backend:latest
                    
                    echo "\$DOCKER_PASSWORD" | docker login -u "\$DOCKER_USERNAME" --password-stdin
                    
                    docker push \$DOCKER_USERNAME/chat-app-frontend:latest
                    docker push \$DOCKER_USERNAME/chat-app-backend:latest
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(
                credentialsId: "dockerhubId",
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                    echo "\$DOCKER_PASSWORD" | docker login -u "\$DOCKER_USERNAME" --password-stdin
                    docker compose pull frontend backend
                    docker compose up -d --no-deps --force-recreate frontend
                    docker compose up -d --no-deps --force-recreate backend
                    """
                }
            }
        }
    }
}