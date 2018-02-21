# Variable can be set by creating a file foo.tfvars
# with `do_token = "token"` in it, then passing -var-file=foo.tfvars
# or by having TF_VAR_do_token as an env variable.
variable "do_token" { }

provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_droplet" "todo-droplet" {
  image = "ubuntu-16-04-x64"
  name = "todo"
  region = "nyc3"
  size = "1gb"
  # SSH key fingerprint will be unique
  ssh_keys = ["42:cb:c1:a3:ff:8a:4d:4d:3b:f8:e8:47:06:89:86:50"]
}

# run `terraform destroy` to remove instances
