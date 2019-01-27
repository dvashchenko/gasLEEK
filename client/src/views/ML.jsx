import React from "react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

class ML extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "scroll" }}
                  >
                    <h1 id="setupguide">Setup Guide</h1>
                    <blockquote>
                      <p>Guide completed/tested on MacOS</p>
                    </blockquote>

                    <hr />

                    <h2 id="versioncheck">Version check</h2>

                    <h3 id="pythonversion">Python version</h3>

                    <pre><code class="bash language-bash">$python3 --version
                    Python 3.7.2
                    </code></pre>

                    <h3 id="pip3version">pip3 version</h3>

                    <pre><code class="bash language-bash">$pip3 --verison
                    pip 18.1 from /usr/local/lib/python3.7/site-packages/pip (python 3.7)
                    </code></pre>

                    <h3 id="virtualenvversion">virtualenv version</h3>

                    <pre><code class="bash language-bash">$virtualenv --version
                    16.3.0
                    </code></pre>

                    <hr />

                    <h2 id="dependencies">Dependencies</h2>

                    <blockquote>
                      <p>All required dependencies and their version used in this project are within <code>requirements.txt</code>. To properly install all dependencies enter the following commands in order.</p>
                    </blockquote>

                    <pre><code class="bash language-bash">$pip3 install -r requirements.txt
                    </code></pre>

                    <h3 id="tensorflowsetup">Tensorflow setup</h3>

                    <p><a href="https://www.tensorflow.org/install/pip">TensorFlow</a></p>

                    <pre><code class="bash language-bash">
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
                    </code></pre>

                    <blockquote>
                      <p>If the message <code>Could not find a version that satisfies the requirement tensorflow (from versions: ) No matching distribution found for tensorflow</code> appears enter the following command in the terminal</p>
                    </blockquote>

                    <pre><code class="bash language-bash">$python3 -m pip install --upgrade https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-1.12.0-py3-none-any.whl
                    </code></pre>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ML;
