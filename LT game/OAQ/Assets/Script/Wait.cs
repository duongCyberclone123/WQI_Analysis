using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class Wait : MonoBehaviour
{
    private float waitTime = 5.0f;
    // Start is called before the first frame update
    //void Start()
    //{
        
    //}

    // Update is called once per frame
    void Update()
    {   
        while (waitTime > 0)
        {
            waitTime -= Time.deltaTime;
        }
        SceneManager.LoadScene("start");
    }
}
