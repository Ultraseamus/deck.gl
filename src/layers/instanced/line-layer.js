// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import {Layer} from '../../../lib';
import {Spheres, Lines} from '../../../mesh';
export default class GraphLayer extends Layer {

  initializeState({props}) {
    this.state.meshes = this._generateMeshes()
  }

  updateState({oldProps, props}) {
    if (this.changeFlags.dataChanged) {
      // for (const {meshID, propertyID} of props.updateTriggers) {
      this._updateMeshes({});
      // }
    }
  }

  _generateMeshes() {
    const meshes = new Map();
    const nodes = new Spheres({
      position: this.props.data.getNodePosition(),
      color: this.props.data.getNodeColor(),
      size: this.props.data.getNodeSize(),
      id: `${this.id}.nodes`,
      cameraID: this.props.cameraID
    });

    meshes.set(`${this.id}.nodes`, nodes);

    const edges = new Lines({
      position: this.props.data.getNodePosition(),
      color: this.props.data.getNodeColor(),
      index: this.props.data.getEdgeNodeIndex(),
      id: `${this.id}.edges`,
      cameraID: this.props.cameraID
    });

    meshes.set(`${this.props.id}.edges`, edges);

    return meshes;
  }

  _updateMeshes({meshID, propertyID}) {
    this.state.meshes.get(`${this.id}.nodes`).updateProperty({
      propertyID: 'position',
      data: this.props.data.getNodePosition()
    });

    this.state.meshes.get(`${this.id}.edges`).updateProperty({
      propertyID: 'position',
      data: this.props.data.getNodePosition()
    });
  }
}

GraphLayer.layerName = 'GraphLayer';