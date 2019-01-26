# Setup Guide

> Guide completed/tested on MacOS

---

## Version check

### Python version

```bash
$python3 --version
Python 3.7.2
```

### pip3 version

```bash
$pip3 --verison
pip 18.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
```

### virtualenv version

```bash
$virtualenv --version
16.3.0
```

---

## Dependencies

> All required dependencies and their version used in this project are within `requirements.txt`. To properly install all dependencies enter the following commands in order.

```bash
$pip3 install -r requirements.txt
```

### Tensorflow setup

[TensorFlow](https://www.tensorflow.org/install/pip)

```bash
$/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$export PATH="/usr/local/bin:/usr/local/sbin:$PATH"
$brew update
$brew install python  # Python 3
$sudo pip3 install -U virtualenv  # system-wide install
$virtualenv --system-site-packages -p python3 ./venv
$source ./venv/bin/activate  # sh, bash, ksh, or zsh
$pip3 install --upgrade pip
$pip3 list  # show packages installed within the virtual environment
$deactivate  # don't exit until you're done using TensorFlow
$pip3 install --upgrade tensorflow
$python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"
```

> If the message `Could not find a version that satisfies the requirement tensorflow (from versions: ) No matching distribution found for tensorflow` appears enter the following command in the terminal

```bash
$python3 -m pip install --upgrade https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.12.0-py3-none-any.whl
```