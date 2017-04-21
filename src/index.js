import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
const THREE = require('three')
const StereoEffect = require('three-stereo-effect')(THREE)

const scene = new Scene();
const camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);

camera.position.set(0, 15, 0);

scene.add(camera);

const renderer = new WebGLRenderer();
const element = renderer.domElement;
const container = document.getElementById('webglviewer');

container.appendChild(element);

const effect = new StereoEffect(renderer);

console.log('INDEX', scene, camera, StereoEffect);