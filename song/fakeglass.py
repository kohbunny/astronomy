# fakeglass.py — makes the press's fake glass beside map.html: cam.y4m (a dim room with a window, 640x480, 30 frames)
# and hum.wav (six seconds of a 174 hz hum). python3 fakeglass.py — no packages wanted.
import math, struct, wave, random
sr=44100; n=sr*6; random.seed(1); frames=bytearray()
for i in range(n):
    t=i/sr; env=min(1,t/0.4)*min(1,(6-t)/0.4)
    v=0.55*math.sin(2*math.pi*174*t)+0.2*math.sin(2*math.pi*348*t+0.3)+0.08*math.sin(2*math.pi*522*t)+0.06*(random.random()*2-1)
    frames+=struct.pack('<h',int(max(-1,min(1,v*env))*32000))
w=wave.open('hum.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(frames)); w.close()
W,H=640,480
with open('cam.y4m','wb') as f:
    f.write(b'YUV4MPEG2 W640 H480 F30:1 Ip A1:1 C420jpeg\n')
    Y=bytearray(W*H); U=bytes([120])*(W*H//4); V=bytes([134])*(W*H//4)
    for y in range(H):
        for x in range(W): Y[y*W+x]=int(min(235,60+70*(1-y/H)+(90 if (200<x<440 and 80<y<260) else 0)))
    for fr in range(30): f.write(b'FRAME\n'); f.write(bytes(Y)); f.write(U); f.write(V)
print('cam.y4m and hum.wav stand')
