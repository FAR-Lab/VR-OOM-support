import subprocess

subprocess.call(['node','supportCode/IMU/serialtoUDP.js','&'])
print "does this also work now"
#node supportCode/IMU/serialUDP.js &
#node supportCode/OBD2Forward/OBD2SpeedForward.js &
#python supportCode/UDP_dataLogger/udpLogger.py &

