# DevOps WebGeeks Talk

Here is a repo for a short introduction to some devops stuff.

Inside the talk directory is the markdown slides.
Serve the index file and it'll show up as a presentation.

Inside the todo directory is a simple React app for demonstration.

The terraform directory has a file for creating a DigitalOcean droplet.
Look up Terraform variables for how to set the API key.
The ssh key will need to be changed.
If you want to use your own ssh key, you can add it via Terraform or through DigitalOcean.

Inside the ansible directory is a simple playbook for configuring a web server.
You will need to change the IP address in the hosts file.
The source for downloading the release will need to be added.
You can run the playbook with `ansible-playbook -i hosts todo-config.yml`.
Reference the ansible-playbook manual if this doesn't work.

The Travis configuration will need a different deploy API key, and the repo changed.
It does deploy, but because it adds a tag it runs twice (the second not deploying).

All code released public domain.
